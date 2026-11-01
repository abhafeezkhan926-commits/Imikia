import {ObjectId} from 'mongodb';
import {db} from './db';
import {defaultAppearance,normalizeAppearance,Appearance} from './appearance';
import {adminPreferences} from './admin-preferences';
import type {SessionUser} from './session';
export async function customerPreferences(customerId:string):Promise<Appearance>{if(!process.env.MONGODB_URI)return defaultAppearance;const value=await(await db()).collection('customer_preferences').findOne({customerId:new ObjectId(customerId)});return normalizeAppearance(value as Partial<Appearance>|null)}
export async function userPreferences(user:SessionUser|null):Promise<Appearance>{if(!user)return defaultAppearance;try{return user.role==='admin'?await adminPreferences():user.role==='customer'?await customerPreferences(user.id):await staffPreferences(user.id)}catch{return defaultAppearance}}
export async function saveCustomerPreferences(customerId:string,appearance:Appearance){const value=normalizeAppearance(appearance);const collection=(await db()).collection('customer_preferences');await collection.createIndex({customerId:1},{unique:true});await collection.updateOne({customerId:new ObjectId(customerId)},{$set:{...value,updatedAt:new Date()}},{upsert:true});return value}

export async function staffPreferences(staffId:string):Promise<Appearance>{const value=await(await db()).collection('staff_preferences').findOne({staffId:new ObjectId(staffId)});return normalizeAppearance(value as Partial<Appearance>|null)}
export async function saveStaffPreferences(staffId:string,appearance:Appearance){const value=normalizeAppearance(appearance);const collection=(await db()).collection('staff_preferences');await collection.createIndex({staffId:1},{unique:true});await collection.updateOne({staffId:new ObjectId(staffId)},{$set:{...value,updatedAt:new Date()}},{upsert:true});return value}
