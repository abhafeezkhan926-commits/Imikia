import {MetadataRoute} from 'next';
import {db} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';const pages=await(await db()).collection('original_pages').find({},{projection:{path:1}}).toArray();return [...new Set([...pages.map(p=>p.path),'/services','/privacy','/terms'])].map(path=>({url:base+(path==='/'?'':path)}))}
