import {NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {hashPassword,customerToken,customerCookie} from '@/lib/customer-auth';
import {sameOrigin} from '@/lib/origin';
import {allowAttempt} from '@/lib/rate-limit';
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().toLowerCase().email().max(254),password:z.string().min(8).max(128),confirmPassword:z.string()}).refine(v=>v.password===v.confirmPassword,{path:['confirmPassword'],message:'match'});
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 if(!allowAttempt('customer-register',20))return NextResponse.json({error:'Too many attempts. Try again in a minute.'},{status:429});
 let input;try{input=schema.safeParse(await req.json())}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
 if(!input.success){const field=input.error.issues[0]?.path[0];const error=field==='name'?'Enter your full name using 2–100 characters.':field==='email'?'Enter a valid email address.':field==='password'?'Choose a password of at least eight characters.':'The two passwords do not match.';return NextResponse.json({error},{status:400})}
 const {name,email,password}=input.data;
 if(email===process.env.ADMIN_EMAIL?.trim().toLowerCase())return NextResponse.json({error:'This email is already in use. Please sign in.'},{status:409});
 try{const database=await db();if(await database.collection('staff').findOne({email},{projection:{_id:1}}))return NextResponse.json({error:'This email is already in use. Please sign in.'},{status:409});const collection=database.collection('customers');await collection.createIndex({email:1},{unique:true});const passwordHash=await hashPassword(password);const {ObjectId}=await import('mongodb');const id=new ObjectId();const token=customerToken(id.toString());await collection.insertOne({_id:id,name,email,passwordHash,role:'customer',createdAt:new Date()});const{logActivity}=await import('@/lib/activity');logActivity('Customer registered',email);const response=NextResponse.json({ok:true,redirect:'/account'},{status:201});response.cookies.set('imikia_customer',token,customerCookie(req));response.cookies.delete('imikia_admin');return response}catch(e){if((e as {code?:number}).code===11000)return NextResponse.json({error:'This email is already in use. Please sign in.'},{status:409});return NextResponse.json({error:'Account creation is temporarily unavailable. Please try again.'},{status:503})}
}

