export const dynamic='force-dynamic';
import {Shell} from '@/components/shell';
import CategoryGrid from '@/components/public/category-grid';
import {categories,products} from '@/lib/db';
import type {CategoryView,ProductView} from '@/lib/ui-types';
export const metadata={title:'Product categories'};
export default async function Page(){const [categoryRows,productRows]=await Promise.all([categories().catch(()=>[]),products().catch(()=>[])]);return <Shell><section className="page-head premium-page-head"><div className="eyebrow">EXPLORE THE RANGE</div><h1>Categories for every kind of adventure.</h1><p>Browse the current product categories and find models to discuss with our team.</p></section><section className="section premium-catalogue"><CategoryGrid categories={categoryRows as CategoryView[]} products={productRows as ProductView[]}/></section></Shell>}
