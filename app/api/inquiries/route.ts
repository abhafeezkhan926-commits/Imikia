import {sameOrigin} from '@/lib/origin';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {cartIdentity,cartItems} from '@/lib/quote-cart';
import {allowAttempt} from '@/lib/rate-limit';
const schema=z.object({name:z.string().trim().min(1).max(100),email:z.string().trim().toLowerCase().email().max(200),company:z.string().trim().min(1).max(200),country:z.string().trim().min(1).max(100),phone:z.string().trim().max(60).optional(),product:z.string().trim().max(200).optional(),message:z.string().trim().min(10).max(5000),consent:z.literal('yes')});
export async function POST(req:Request){
 try{
  if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
  if(!allowAttempt('inquiries',30))return NextResponse.json({error:'Please try again in a minute.'},{status:429});
  let parsed;let body;try{body=await req.json();parsed=schema.safeParse(body)}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
  if(!parsed.success){const field=parsed.error.issues[0]?.path[0];const error=field==='email'?'Enter a valid business email address.':field==='message'?'Tell us about your requirements using at least 10 characters.':field==='consent'?'Please agree to the privacy policy before sending.':'Please complete all required fields.';return NextResponse.json({error},{status:400})}
  let user=null;try{const{currentUser}=await import('@/lib/session');user=await currentUser()}catch{}
  if(!user)return NextResponse.json({error:'Please sign in to send your enquiry.'},{status:401});
  if(!process.env.MONGODB_URI)return NextResponse.json({error:'Online enquiries are not configured yet. Please email sales@imikia.com.'},{status:503});
  const database=await db();
  const recent=await database.collection('inquiries').countDocuments({email:parsed.data.email,createdAt:{$gt:new Date(Date.now()-60000)}});
  if(recent)return NextResponse.json({error:'Please wait a minute before sending another enquiry.'},{status:429});
  const items=body.includeCart==='yes'?await cartItems((await cartIdentity()).owner):[];if(body.includeCart==='yes'&&!items.length)return NextResponse.json({error:'Your quote cart is empty. Add a product first.'},{status:400});await database.collection('inquiries').insertOne({...parsed.data,...(items.length?{items}:{}),createdAt:new Date(),status:'new'});
  return NextResponse.json({message:'Thank you. Your enquiry has been received. Our team will review your requirements.'});
 }catch{return NextResponse.json({error:'Unable to save your enquiry. Please email sales@imikia.com.'},{status:503})}
}
