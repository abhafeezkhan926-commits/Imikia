'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {Globe2,Menu,X,UserRound,UserPlus,ShoppingBag,ArrowUpRight,ChevronDown,LayoutDashboard,Palette} from 'lucide-react';
import {ProfileTrigger,ProfileAvatar} from '@/components/profile/profile-menu';
import {useAppearance} from '@/components/profile/theme-provider';
import {SiteConfig} from '@/lib/ui-types';

const links=[['Home','/'],['About us','/about-us'],['Products','/products'],['Categories','/categories'],['Contact','/contact-us']];
const drawerId='site-navigation-drawer';

export function Header({config}:{config:SiteConfig}){
  const[drawerOpen,setDrawerOpen]=useState(false);
  const[count,setCount]=useState<number|null>(null);
  const{user,openProfile}=useAppearance();
  const path=usePathname();

  useEffect(()=>setDrawerOpen(false),[path]);

  useEffect(()=>{
    const controller=new AbortController();
    const load=()=>fetch('/api/cart',{signal:controller.signal}).then(async r=>{
      if(!r.ok)return;
      const data=await r.json();
      if(Array.isArray(data.items))setCount(data.items.reduce((n:number,i:{quantity?:number})=>n+(typeof i.quantity==='number'?i.quantity:0),0));
    }).catch(()=>{});
    load();
    window.addEventListener('quote-cart-updated',load);
    return()=>{controller.abort();window.removeEventListener('quote-cart-updated',load)};
  },[]);

  useEffect(()=>{
    if(!drawerOpen)return;
    const previous=document.body.style.overflow;
    const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setDrawerOpen(false)};
    document.body.style.overflow='hidden';
    document.addEventListener('keydown',close);
    return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',close)};
  },[drawerOpen]);

  useEffect(()=>{
    const wide=window.matchMedia('(min-width:901px)');
    const close=()=>{if(wide.matches)setDrawerOpen(false)};
    wide.addEventListener('change',close);
    return()=>wide.removeEventListener('change',close);
  },[]);

  const closeDrawer=()=>setDrawerOpen(false);
  const openAppearance=()=>{closeDrawer();openProfile()};
  const cartUnits=count===null?'Quote cart':`Quote cart, ${count} requested units`;

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="topbar">
      <span><span className="live-dot"/> YOUR GLOBAL RIDE-ON SOURCING PARTNER</span>
      <span><Globe2 size={12}/> International business. Personal support.</span>
    </div>
    <header className="site-header">
      <Link href="/" className="logo" aria-label="IMIKIA home">{config?.brand||'imikia'}<span>®</span><small>THE WORLD OF RIDE-ON</small></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label,href])=><Link href={href} key={href} aria-current={path===href?'page':undefined}>{label}{label==='Categories'&&<ChevronDown size={12}/>}</Link>)}
      </nav>
      <div className="header-actions">
        {user
          ?<span className="header-profile"><ProfileTrigger label/></span>
          :<>
            <Link className="account-link" href="/sign-in"><UserRound size={17}/><span>Login</span></Link>
            <Link className="account-link signup-link" href="/register"><UserPlus size={17}/><span>Sign up</span></Link>
          </>}
        <Link href="/quote-cart" className="cart-link" aria-label={cartUnits}><ShoppingBag size={18}/>{count!==null&&<span>{count}</span>}</Link>
        <Link className="button small" href="/inquiry">Get a quote <ArrowUpRight size={15}/></Link>
        <button className="menu icon-button" aria-expanded={drawerOpen} aria-controls={drawerId} aria-label={drawerOpen?'Close menu':'Open menu'} onClick={()=>setDrawerOpen(!drawerOpen)}>{drawerOpen?<X/>:<Menu/>}</button>
      </div>
    </header>

    {drawerOpen&&<button className="site-drawer-backdrop" aria-label="Close menu" onClick={closeDrawer}/>}
    <aside id={drawerId} className={'site-drawer'+(drawerOpen?' open':'')} aria-hidden={!drawerOpen} aria-label="Site menu">
      <div className="site-drawer-head">
        <span>MENU</span>
        <button className="icon-button" aria-label="Close menu" onClick={closeDrawer}><X size={19}/></button>
      </div>
      <nav aria-label="Mobile navigation">
        {links.map(([label,href])=><Link href={href} key={href} aria-current={path===href?'page':undefined} onClick={closeDrawer}>{label}<ArrowUpRight size={14}/></Link>)}
      </nav>
      <div className="site-drawer-account">
        {user?<>
          <div className="drawer-user">
            <ProfileAvatar small/>
            <div><b>{user.name}</b><small>{user.email}</small></div>
          </div>
          <Link href={user.role==='customer'?'/account':'/admin'} onClick={closeDrawer}><LayoutDashboard size={15}/>My workspace</Link>
          <button type="button" onClick={openAppearance}><Palette size={15}/>Profile &amp; appearance</button>
        </>:<>
          <p>Sign in to keep your quote cart and preferences across visits.</p>
          <Link className="button small" href="/sign-in" onClick={closeDrawer}>Login</Link>
          <Link className="button small secondary" href="/register" onClick={closeDrawer}>Create an account</Link>
        </>}
      </div>
      <div className="site-drawer-actions">
        <Link className="site-drawer-cart" href="/quote-cart" onClick={closeDrawer}><span><ShoppingBag size={17}/>Quote cart</span>{count!==null&&<b>{count}</b>}</Link>
        <Link className="button" href="/inquiry" onClick={closeDrawer}>Get a quote <ArrowUpRight size={15}/></Link>
      </div>
    </aside>
  </>;
}
