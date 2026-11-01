import {Shell} from '@/components/shell';
import QuoteCart from '@/components/quotations/quote-cart';
export const metadata={title:'Your quote cart',robots:{index:false,follow:false}};
export default function Page(){return <Shell><section className="page-head compact-head"><div className="breadcrumb">HOME / QUOTE CART</div><div className="eyebrow">YOUR NEXT BUSINESS CONVERSATION</div><h1>Your quote cart<span className="orange-dot">.</span></h1><p>One place for the products you want to explore.</p></section><section className="section"><QuoteCart/></section></Shell>}
