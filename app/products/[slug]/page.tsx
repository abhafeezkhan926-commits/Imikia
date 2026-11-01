import {notFound} from 'next/navigation';
import {Shell} from '@/components/shell';
import ProductDetail from '@/components/public/product-detail';
import {products,categories} from '@/lib/db';
import type {ProductView,CategoryView} from '@/lib/ui-types';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;try{const product=(await products()).find(row=>row.slug===slug);return product?{title:product.name,description:product.description}:{title:'Product not found'}}catch{return {title:'IMIKIA products'}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;let catalogue:ProductView[],groups:CategoryView[];try{[catalogue,groups]=await Promise.all([products(),categories()]) as [ProductView[],CategoryView[]]}catch{notFound()}const product=catalogue.find(row=>row.slug===slug);if(!product)notFound();const related=catalogue.filter(row=>row.slug!==slug&&row.category===product.category).slice(0,4);return <Shell><ProductDetail product={product} categories={groups} related={related}/></Shell>}
