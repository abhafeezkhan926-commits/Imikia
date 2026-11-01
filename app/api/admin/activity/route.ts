import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {isAdmin} from '@/lib/auth';
export async function GET(){if(!await isAdmin())return NextResponse.json({error:'Unauthorised'},{status:401});try{return NextResponse.json(await(await db()).collection('activityLogs').find({}).sort({at:-1}).limit(100).toArray())}catch{return NextResponse.json({error:'Database unavailable'},{status:503})}}
