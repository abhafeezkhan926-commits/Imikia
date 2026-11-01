import {sameOrigin} from '@/lib/origin';
import {NextResponse} from 'next/server';
import {canAccess} from '@/lib/auth';
import {db} from '@/lib/db';
import {categories,seedProducts,articles} from '@/lib/data';
import {initialContent,initialSettings} from '@/lib/initial-content';
import {migratedCatalogue,migratedSubcategories} from '@/lib/migration-manifest';
import {logActivity} from '@/lib/activity';
export async function POST(req:Request){if(!await canAccess('seed'))return NextResponse.json({error:'Unauthorised'},{status:401});if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});try{const database=await db();if(await database.collection('original_pages').countDocuments({})>0)return NextResponse.json({message:'The complete original catalogue is already imported. Existing content was preserved.'});const sets:Record<string,{slug:string}[]>={categories:[...categories,...migratedSubcategories],products:migratedCatalogue.map(p=>({...p,...seedProducts.find(s=>s.slug===p.slug)})),articles,content:initialContent,settings:[initialSettings]};for(const[group,records]of Object.entries(sets)){await database.collection(group).createIndex({slug:1},{unique:true});for(const r of records)await database.collection(group).updateOne({slug:r.slug},{$setOnInsert:{...r,createdAt:new Date()}},{upsert:true})}logActivity('Imported initial content','Catalogue seed');return NextResponse.json({message:'Initial content imported. Existing records were preserved.'})}catch{return NextResponse.json({error:'Import failed. Check MongoDB connection.'},{status:503})}}
