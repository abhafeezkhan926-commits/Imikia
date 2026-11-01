import {notFound} from 'next/navigation';
import {Shell} from '@/components/shell';
import {articles} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const a=(await articles()).find(a=>a.slug===slug);if(!a)notFound();return <Shell><section className="page-head"><div className="eyebrow">{a.type}</div><h1>{a.title}</h1><p>{a.intro}</p></section><article className="section editorial"><p>{a.body}</p><p className="muted">New editorial draft for client review.</p></article></Shell>}
