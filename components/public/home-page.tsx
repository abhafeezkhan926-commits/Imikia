import Link from 'next/link';
import {ArrowRight,ArrowUpRight,Check,Globe2,PackageCheck,ShieldCheck,Truck} from 'lucide-react';
import {Shell} from '@/components/shell';
import CategoryGrid from './category-grid';
import {ProductCard,ProductImage} from './product-card';
import {categories,products} from '@/lib/db';
import type {CategoryView,ProductView} from '@/lib/ui-types';

export default async function HomePage(){
  const [productRows,categoryRows]=await Promise.all([
    products().catch(()=>[]),
    categories().catch(()=>[]),
  ]);
  const catalogue=productRows as ProductView[];
  const groups=categoryRows as CategoryView[];
  const featured=catalogue.filter(product=>product.featured).slice(0,4);
  const hero=featured[0]||catalogue[0];

  return <Shell>
    <section className="premium-hero premium-enter" aria-labelledby="hero-title">
      <div className="premium-hero-copy">
        <span className="eyebrow"><span className="live-dot"/> B2B SOURCING · RIDE-ON VEHICLES</span>
        <h1 id="hero-title">Discover a world of <em>premium ride-on vehicles.</em></h1>
        <p>Your B2B partner for sourcing children’s electric ride-on cars, motorcycles and innovative mobility products.</p>
        <div className="premium-actions"><Link className="button" href="/products">Explore products <ArrowRight size={17}/></Link><Link className="premium-text-link" href="/inquiry">Request a quote <ArrowUpRight size={17}/></Link></div>
        <div className="premium-proof"><span><Globe2 size={16}/> For international buyers</span><span><PackageCheck size={16}/> Product sourcing</span><span><ShieldCheck size={16}/> Quality coordination</span></div>
      </div>
      <div className="premium-hero-visual">
        <div className="premium-orbit premium-orbit-one"/><div className="premium-orbit premium-orbit-two"/>
        <span className="premium-index">IMIKIA / COLLECTION 01</span>
        {hero?<Link className="premium-hero-product" href={'/products/'+hero.slug}><ProductImage src={hero.image} alt={hero.name} priority/><span className="premium-product-caption"><span><small>FEATURED MODEL</small><b>{hero.name}</b></span><ArrowUpRight size={20}/></span></Link>:<div className="premium-hero-placeholder"><span>imikia<sup>®</sup></span></div>}
        <span className="premium-vertical">SMALL WHEELS. BIG POSSIBILITIES.</span>
      </div>
    </section>

    <section className="premium-trust-strip" aria-label="Business services"><span>BUILT AROUND YOUR SOURCING NEEDS</span><div><span><Globe2/>International buyers</span><span><PackageCheck/>Product discovery</span><span><Truck/>Shipping coordination</span><span><Check/>Quality conversations</span></div></section>

    <section className="section premium-section" id="categories">
      <div className="section-heading"><div><span className="eyebrow">EXPLORE THE RANGE</span><h2>Find your next category.</h2></div><p className="section-intro">Explore our database-backed catalogue and share the models that fit your market.</p></div>
      <CategoryGrid categories={groups} products={catalogue}/>
    </section>

    <section className="premium-featured-band">
      <div className="section premium-section">
        <div className="section-heading"><div><span className="eyebrow">SELECTED FOR YOU</span><h2>Featured products.</h2></div><Link className="premium-text-link" href="/products">View full catalogue <ArrowRight size={16}/></Link></div>
        {featured.length?<div className="product-grid">{featured.map(product=><ProductCard key={product.slug} product={product} category={groups.find(category=>category.slug===product.category)?.name}/>)}</div>:<div className="premium-empty"><p>Featured models are being prepared. Browse the catalogue for current products.</p><Link className="text-link" href="/products">Explore products <ArrowRight size={15}/></Link></div>}
      </div>
    </section>

    <section className="premium-editorial">
      <div className="premium-editorial-art"><span className="premium-editorial-mark">i</span><span className="premium-editorial-note">IMIKIA · SOURCING PARTNER</span></div>
      <div className="premium-editorial-copy"><span className="eyebrow">A PARTNER FOR YOUR PRODUCT RANGE</span><h2>From product discovery to the details that move a business forward.</h2><p>IMIKIA supports importers, distributors and retailers exploring children’s ride-on vehicles. Tell us about your market, product requirements and order plans; our team can help you review the next steps.</p><Link className="text-link" href="/about-us">Meet IMIKIA <ArrowUpRight size={16}/></Link></div>
    </section>

    <section className="premium-cta"><div><span className="eyebrow">LET’S TALK BUSINESS</span><h2>Ready to grow your product range?</h2><p>Share your requirements and start a sourcing conversation with IMIKIA.</p><div className="premium-actions"><Link className="button light" href="/products">Explore products <ArrowRight size={17}/></Link><Link className="premium-text-link" href="/inquiry">Request a quote <ArrowUpRight size={17}/></Link></div></div><span className="premium-cta-mark" aria-hidden="true">imikia</span></section>
  </Shell>;
}
