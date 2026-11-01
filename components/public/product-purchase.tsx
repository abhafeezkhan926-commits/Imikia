'use client';
import {useState} from 'react';
import {Minus,Plus,ArrowUpRight,ShoppingBag} from 'lucide-react';
import Link from 'next/link';
import AddToQuote from './add-to-quote';
export default function ProductPurchase({slug}:{slug:string}){const[quantity,setQuantity]=useState(1);return <div className="purchase"><label>Requested quantity<div className="quantity"><button type="button" aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(q=>Math.max(1,q-1))}><Minus size={15}/></button><input aria-label="Requested quantity" type="number" min={1} max={100000} value={quantity} onChange={e=>setQuantity(Math.min(100000,Math.max(1,Number(e.target.value)||1)))}/><button type="button" aria-label="Increase quantity" onClick={()=>setQuantity(q=>Math.min(100000,q+1))}><Plus size={15}/></button></div></label><AddToQuote slug={slug} quantity={quantity}/><a className="button secondary" href="#quote">Request information <ArrowUpRight size={16}/></a><p className="muted">Quotation only. No payment is collected online.</p></div>}
