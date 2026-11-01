import {NextResponse} from 'next/server';
import {products,categories} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(){try{const[p,c]=await Promise.all([products(),categories()]);return NextResponse.json({products:p,categories:c})}catch{return NextResponse.json({error:'Catalogue temporarily unavailable'},{status:503})}}
