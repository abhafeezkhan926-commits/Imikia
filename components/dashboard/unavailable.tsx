import {PlugZap,ArrowUpRight} from 'lucide-react';
import Link from 'next/link';
export default function Unavailable({title,description}:{title:string;description:string}){return <section className="integration-panel"><div className="integration-visual"><PlugZap size={43}/></div><span className="badge warning">Integration required</span><h2>{title}</h2><p>{description}</p><p className="muted">No records or successful actions are simulated.</p><Link className="button secondary" href="/admin">Return to overview<ArrowUpRight size={16}/></Link></section>}
