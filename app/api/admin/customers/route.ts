import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {canAccess} from '@/lib/auth';
export async function GET(){if(!await canAccess('inquiries'))return NextResponse.json({error:'Unauthorised'},{status:401});try{return NextResponse.json(await(await db()).collection('customers').find({},{projection:{name:1,email:1,createdAt:1}}).sort({createdAt:-1}).limit(200).toArray())}catch{return NextResponse.json({error:'Database unavailable'},{status:503})}}
