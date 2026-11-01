import {NextResponse} from 'next/server';
import {canAccess} from '@/lib/auth';
import {db} from '@/lib/db';
export async function GET(){if(!await canAccess('media'))return NextResponse.json({error:'Unauthorised'},{status:401});try{return NextResponse.json(await(await db()).collection('media').find({}).sort({createdAt:-1}).limit(200).toArray())}catch{return NextResponse.json({error:'Database unavailable'},{status:503})}}
