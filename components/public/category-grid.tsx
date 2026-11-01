import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {CategoryView,ProductView} from '@/lib/ui-types';
import {ProductImage} from './product-card';
import {EmptyState} from '../ui/primitives';
export default function CategoryGrid({categories,products}:{categories:CategoryView[];products:ProductView[]}){const cats=categories.filter(c=>!c.parent&&c.active!==false);return cats.length?<div className="category-grid">{cats.map((c,i)=>{const image=c.image||products.find(p=>p.category===c.slug)?.image;return <Link className="category-card" key={c.slug} href={'/products?category='+c.slug}><span className="category-number">0{i+1}</span><div className="category-art">{image?<ProductImage src={image} alt={c.name}/>:<span className="category-letter">{c.name[0]}</span>}</div><div><h3>{c.name}</h3><p>{c.description}</p></div><span className="round-link"><ArrowUpRight size={18}/></span></Link>})}</div>:<EmptyState title="A new collection is on its way" description="Our product categories are being updated. Tell us what you’re sourcing and we’ll help you explore the options." href="/inquiry" label="Request information"/>}
