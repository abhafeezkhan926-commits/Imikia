import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(){try{await(await db()).command({ping:1});return NextResponse.json({database:'connected'})}catch{return NextResponse.json({database:'unavailable'},{status:503})}}
