'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';

export function PageLoadingOverlay(){return <div className="page-loading-overlay" role="status" aria-label="Loading page"><span className="page-loading-circle" aria-hidden="true"/><span className="sr-only">Loading page</span></div>}

export default function NavigationFeedback(){
  const path=usePathname();
  const[pending,setPending]=useState(true);
  useEffect(()=>{setPending(false)},[path]);
  useEffect(()=>{
    const ready=()=>setPending(false);
    const click=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const anchor=(event.target as Element).closest?.('a[href]') as HTMLAnchorElement|null;
      if(!anchor||anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;
      const url=new URL(anchor.href,window.location.href);
      if(url.origin===window.location.origin&&url.pathname!==window.location.pathname)setPending(true);
    };
    document.addEventListener('click',click,true);
    window.addEventListener('pageshow',ready);
    return()=>{document.removeEventListener('click',click,true);window.removeEventListener('pageshow',ready)};
  },[]);
  useEffect(()=>{if(!pending)return;const timer=window.setTimeout(()=>{setPending(false);window.dispatchEvent(new Event('navigation-feedback-reset'))},15000);return()=>clearTimeout(timer)},[pending]);
  return pending?<PageLoadingOverlay/>:null;
}
