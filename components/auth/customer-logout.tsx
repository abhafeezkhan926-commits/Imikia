'use client';
import {useState} from 'react';
import {Spinner} from '@/components/ui/primitives';
export default function CustomerLogout(){
  const[error,setError]=useState('');
  const[busy,setBusy]=useState(false);
  return <><button className="button" disabled={busy} aria-busy={busy} onClick={async()=>{
    if(busy)return;
    setBusy(true);setError('');
    try{
      const response=await fetch('/api/auth/login',{method:'DELETE'});
      if(response.ok){window.location.assign('/sign-in');return}
      setError('Unable to sign out. Please try again.');
    }catch{setError('Unable to sign out. Please try again.')}
    setBusy(false);
  }}>{busy&&<Spinner/>}{busy?'Signing out…':'Sign out'}</button>{error&&<p role="alert">{error}</p>}</>;
}
