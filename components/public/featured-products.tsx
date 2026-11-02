'use client';
import {useState,useEffect} from 'react';
import {request} from '@/lib/client-api';
import {ProductView,CategoryView} from '@/lib/ui-types';
import {ProductCard} from './product-card';
import {EmptyState} from '../ui/primitives';
import ProductCardSkeleton from './product-card-skeleton';
export default function FeaturedProducts(){const[data,setData]=useState<{products:ProductView[];categories:CategoryView[]}|null>(null),[error,setError]=useState('');useEffect(()=>{let active=true;request<{products:ProductView[];categories:CategoryView[]}>('/api/catalogue').then(d=>{if(active)setData(d)}).catch(e=>{if(active)setError(e.message)});return()=>{active=false}},[]);if(!data&&!error)return <ProductCardSkeleton/>;const items=data?.products.filter(p=>p.featured).slice(0,4)||[];return items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.slug} product={p} category={data?.categories.find(c=>c.slug===p.category)?.name}/>)}</div>:<EmptyState error={!!error} title={error?'Our collection is temporarily unavailable':'Featured products are being curated'} description="Looking for a particular model? Share your sourcing requirements with our team." href="/inquiry" label="Discuss your requirements"/>}
