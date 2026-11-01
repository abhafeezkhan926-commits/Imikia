import { MongoClient } from 'mongodb';
import type {Product} from './data';
const g=globalThis as typeof globalThis & {mongoPromise?:Promise<MongoClient>};
export async function db(){const uri=process.env.MONGODB_URI;if(!uri)throw new Error('MongoDB is not configured');g.mongoPromise??=new MongoClient(uri,{serverSelectionTimeoutMS:5000}).connect().catch(e=>{g.mongoPromise=undefined;throw e});return (await g.mongoPromise).db(process.env.MONGODB_DB||'imikia')}
export type Category={slug:string;name:string;description:string;sourcePath?:string;parent?:string};
export type Article={slug:string;title:string;type:string;intro:string;body:string};
export type Content={slug:string;title:string;eyebrow?:string;intro?:string;body?:string;sections?:{title:string;body:string}[]};
export async function products():Promise<Product[]>{const rows=await(await db()).collection('products').find({}).toArray();return rows.map(({_id,...row})=>row as Product)}
export async function categories():Promise<Category[]>{return (await(await db()).collection('categories').find({}).toArray()).map(({_id,...r})=>r as Category)}
export async function articles():Promise<Article[]>{return (await(await db()).collection('articles').find({}).toArray()).map(({_id,...r})=>r as Article)}
export async function content(slug:string):Promise<Content|null>{const r=await(await db()).collection('content').findOne({slug});if(!r)return null;const{_id,...v}=r;return v as Content}
export async function settings(){const r=await(await db()).collection('settings').findOne({slug:'site'});return r?JSON.parse(JSON.stringify(r)):null}
