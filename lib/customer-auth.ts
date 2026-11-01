import {randomBytes,scrypt as derive,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {cookies} from 'next/headers';
import {ObjectId} from 'mongodb';
import {db} from './db';
import {CUSTOMER_COOKIE,customerToken as issueCustomerToken,customerTokenId} from './session-token';
const scrypt=promisify(derive);
export async function hashPassword(password:string){const salt=randomBytes(16).toString('hex');const key=await scrypt(password,salt,64) as Buffer;return salt+':'+key.toString('hex')}
export async function verifyPassword(password:string,stored:string){const[salt,hash]=stored.split(':');if(!salt||!hash)return false;const key=await scrypt(password,salt,64) as Buffer;const expected=Buffer.from(hash,'hex');return expected.length===key.length&&timingSafeEqual(expected,key)}
function secret(){const value=process.env.ADMIN_SESSION_SECRET;if(!value||value.length<32)throw new Error('Session configuration unavailable');return value}
export function customerToken(id:string){return issueCustomerToken(id,secret())}
export function customerId(token:string){return customerTokenId(token,process.env.ADMIN_SESSION_SECRET)}
export async function currentCustomer(){const id=customerId((await cookies()).get(CUSTOMER_COOKIE)?.value||'');if(!id)return null;const user=await(await db()).collection('customers').findOne({_id:new ObjectId(id)},{projection:{name:1,email:1,createdAt:1}});return user?{id:user._id.toString(),name:String(user.name),email:String(user.email)}:null}
export function customerCookie(req:Request){return{httpOnly:true,secure:new URL(req.url).protocol==='https:',sameSite:'lax' as const,path:'/',maxAge:28800}};
