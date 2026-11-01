import Link from 'next/link';
import {ArrowLeft,ArrowUpRight,Check,Package,ShieldCheck} from 'lucide-react';
import type {ProductView,CategoryView} from '@/lib/ui-types';
import Gallery from './gallery';
import ProductPurchase from './product-purchase';
import {ProductCard} from './product-card';

export default function ProductDetail({product,categories,related}:{product:ProductView;categories:CategoryView[];related:ProductView[]}){
  const category=categories.find(row=>row.slug===product.category);
  const subcategory=categories.find(row=>row.slug===product.subcategory);
  return <>
    <section className="premium-detail-head"><div className="breadcrumb"><Link href="/">HOME</Link><span>/</span><Link href="/products">PRODUCTS</Link><span>/</span><span>{category?.name||product.category.replaceAll('-',' ')}</span></div><Link className="premium-back-link" href="/products"><ArrowLeft size={15}/> Back to catalogue</Link></section>
    <section className="premium-product-detail">
      <div className="premium-product-media"><Gallery name={product.name} images={[product.image,...(product.images||[])]} video={product.video}/></div>
      <div className="premium-product-info"><span className="eyebrow">{category?.name||product.category.replaceAll('-',' ')}{subcategory?' · '+subcategory.name:''}</span><h1>{product.name}</h1><div className="premium-product-id">{product.sku?'SKU '+product.sku:'Specifications available on request'}</div><p className="premium-product-description">{product.description}</p>
        <div className="premium-detail-assurances"><span><Package size={16}/> B2B product enquiry</span><span><ShieldCheck size={16}/> Availability on request</span></div>
        <ProductPurchase slug={product.slug}/>
        <Link className="premium-detail-contact" href="/inquiry">Ask our team about this model <ArrowUpRight size={16}/></Link>
        {Object.keys(product.specs||{}).length>0&&<div className="premium-specs"><div className="eyebrow">PRODUCT INFORMATION</div><h2>Specifications</h2><dl>{Object.entries(product.specs).map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl></div>}
        <div className="premium-detail-note"><Check size={16}/><span>Product details and availability can be confirmed with IMIKIA for your market and order requirements.</span></div>
      </div>
    </section>
    {related.length>0&&<section className="section premium-related"><div className="section-heading"><div><span className="eyebrow">CONTINUE EXPLORING</span><h2>Related products.</h2></div><Link className="premium-text-link" href="/products">View catalogue <ArrowUpRight size={16}/></Link></div><div className="product-grid">{related.map(item=><ProductCard key={item.slug} product={item} category={categories.find(row=>row.slug===item.category)?.name}/>)}</div></section>}
  </>;
}
