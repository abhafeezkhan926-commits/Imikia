import {Shell} from '@/components/shell';
import Catalogue from '@/components/public/catalogue';
export const dynamic='force-dynamic';
export const metadata={title:'Product catalogue',description:'Browse children’s electric ride-on vehicles and pedal karts available for B2B sourcing enquiries.'};
export default function Page(){return <Shell><section className="page-head premium-page-head"><div className="eyebrow">IMIKIA PRODUCT CATALOGUE</div><h1>Products for your next opportunity.</h1><p>Browse our current range of children’s ride-on vehicles. Search by model or category, then add products to your quote request.</p></section><section className="section premium-catalogue"><Catalogue/></section></Shell>}
