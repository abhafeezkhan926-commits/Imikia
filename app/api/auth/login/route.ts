import {NextResponse} from 'next/server';
import {POST as adminLogin} from '@/app/api/admin/login/route';
import {db} from '@/lib/db';
import {customerToken,customerCookie,verifyPassword} from '@/lib/customer-auth';
import {token as adminToken,staffToken} from '@/lib/auth';
import {logActivity} from '@/lib/activity';
import {sameOrigin} from '@/lib/origin';
import {allowAttempt} from '@/lib/rate-limit';
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 let body;try{body=await req.clone().json()}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
 if(!body||typeof body!=='object')return NextResponse.json({error:'Enter a valid email address and password.'},{status:400});
 const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
 const password=typeof body.password==='string'?body.password:'';
 if(!emailPattern.test(email)||email.length>254)return NextResponse.json({error:'Enter a valid email address.'},{status:400});
 if(!password||password.length>128)return NextResponse.json({error:'Enter your password.'},{status:400});
 const next=typeof body.next==='string'&&body.next.startsWith('/')&&!body.next.startsWith('//')&&!body.next.includes('\\')&&body.next.length<=500?body.next:'';
 if(email===process.env.ADMIN_EMAIL?.trim().toLowerCase()){const response=await adminLogin(req);if(response.ok){const result=NextResponse.json({ok:true,redirect:next.startsWith('/admin')?next:'/admin'});result.cookies.set('imikia_admin',adminToken(),{httpOnly:true,secure:new URL(req.url).protocol==='https:',sameSite:'strict',path:'/',maxAge:28800});result.cookies.delete('imikia_customer');return result}return response}
 if(!allowAttempt('customer-login',30)||!allowAttempt('customer-login:'+email,8))return NextResponse.json({error:'Too many attempts. Try again in a minute.'},{status:429});
 try{const database=await db();const staffMember=await database.collection('staff').findOne({email});if(staffMember){if(!await verifyPassword(password,staffMember.passwordHash||''))return NextResponse.json({error:'Incorrect email or password'},{status:401});logActivity('Staff signed in',email);const response=NextResponse.json({ok:true,redirect:next.startsWith('/admin')?next:'/admin'});response.cookies.set('imikia_admin',staffToken(staffMember._id.toString(),String(staffMember.role||'staff').toLowerCase()),{httpOnly:true,secure:new URL(req.url).protocol==='https:',sameSite:'strict',path:'/',maxAge:28800});response.cookies.delete('imikia_customer');return response}}catch{}
 try{const user=await(await db()).collection('customers').findOne({email});if(!user||!await verifyPassword(password,user.passwordHash||''))return NextResponse.json({error:'Incorrect email or password'},{status:401});const response=NextResponse.json({ok:true,redirect:next.startsWith('/account')?next:'/account'});response.cookies.set('imikia_customer',customerToken(user._id.toString()),customerCookie(req));response.cookies.delete('imikia_admin');return response}catch{return NextResponse.json({error:'Sign-in is temporarily unavailable. Please try again.'},{status:503})}
}
export async function DELETE(req:Request){if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});const response=NextResponse.json({ok:true});response.cookies.delete('imikia_customer');return response}
