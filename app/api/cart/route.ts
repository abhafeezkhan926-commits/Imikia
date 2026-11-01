import {NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {cartIdentity,cartItems,cartCollection,CART_COOKIE} from '@/lib/quote-cart';
import {sameOrigin} from '@/lib/origin';
import {allowAttempt} from '@/lib/rate-limit';
export const dynamic='force-dynamic';
const schema=z.object({productSlug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160),quantity:z.number().int().min(1).max(999).optional()});
function respond(req:Request,token:string,items:Awaited<ReturnType<typeof cartItems>>){const response=NextResponse.json({items},{headers:{'Cache-Control':'no-store'}});response.cookies.set(CART_COOKIE,token,{httpOnly:true,secure:new URL(req.url).protocol==='https:',sameSite:'lax',path:'/',maxAge:604800});return response}
export async function GET(req:Request){try{const identity=await cartIdentity();return respond(req,identity.token,await cartItems(identity.owner))}catch{return NextResponse.json({error:'Your quote cart could not be loaded. Please try again.'},{status:503})}}
async function change(req:Request,method:'POST'|'PATCH'|'DELETE'){
 if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 let parsed;try{parsed=schema.safeParse(await req.json())}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
 if(!parsed.success)return NextResponse.json({error:'Choose a product and a whole quantity from 1 to 999.'},{status:400});
 try{const identity=await cartIdentity();if(!allowAttempt('quote-cart:'+identity.owner,60))return NextResponse.json({error:'Too many updates. Try again in a minute.'},{status:429});const{productSlug,quantity=1}=parsed.data;const collection=await cartCollection();const filter={owner:identity.owner,productSlug};if(method==='DELETE')await collection.deleteOne(filter);else{if(!await(await db()).collection('products').findOne({slug:productSlug},{projection:{_id:1}}))return NextResponse.json({error:'This product is no longer available.'},{status:404});const dates={updatedAt:new Date(),expiresAt:new Date(Date.now()+604800000)};if(method==='PATCH')await collection.updateOne(filter,{$set:{quantity,...dates}});else await collection.updateOne(filter,[{$set:{quantity:{$min:[999,{$add:[{$ifNull:['$quantity',0]},quantity]}]},createdAt:{$ifNull:['$createdAt','$$NOW']},...dates}}],{upsert:true})}return respond(req,identity.token,await cartItems(identity.owner))}catch{return NextResponse.json({error:'Your quote cart could not be updated. Please try again.'},{status:503})}
}
export function POST(req:Request){return change(req,'POST')}
export function PATCH(req:Request){return change(req,'PATCH')}
export function DELETE(req:Request){return change(req,'DELETE')}
