import {isAdmin,staffIdentity} from './auth';
import {currentCustomer} from './customer-auth';
import {ObjectId} from 'mongodb';
import {db} from './db';
export type SessionUser={role:'admin';name:string;email:string}|{role:'customer'|'manager'|'staff'|'hr';id:string;name:string;email:string};
export async function currentUser():Promise<SessionUser|null>{
 if(await isAdmin())return {role:'admin',name:'Administrator',email:process.env.ADMIN_EMAIL||''};
 const identity=await staffIdentity();
 if(identity){const staff=await(await db()).collection('staff').findOne({_id:new ObjectId(identity.id)},{projection:{name:1,email:1,role:1}});if(staff&&String(staff.role).toLowerCase()===identity.role)return {role:identity.role,id:staff._id.toString(),name:String(staff.name),email:String(staff.email)};return null}
 const customer=await currentCustomer();return customer?{role:'customer',...customer}:null;
}
