import type {Product} from './data';
import type {Category} from './db';
export type ProductView=Product & {sku?:string;stockQuantity?:number;lowStockThreshold?:number;status?:string;images?:string[];videos?:string[];seoTitle?:string;seoDescription?:string};
export type CategoryView=Category & {image?:string;active?:boolean};
export type SiteConfig={brand?:string;tagline?:string;email?:string;phone?:string;address?:string;navigation?:{label:string;href:string}[]}|null;
export function availability(p:ProductView){if(typeof p.stockQuantity!=='number')return {label:'Availability on request',tone:'neutral'};if(p.stockQuantity<=0)return {label:'Out of stock',tone:'danger'};if(typeof p.lowStockThreshold==='number'&&p.stockQuantity<=p.lowStockThreshold)return {label:'Low stock',tone:'warning'};return {label:'In stock',tone:'success'}}
