'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,ShieldCheck} from 'lucide-react';
import {PasswordInput,AuthArtwork} from '@/components/auth/auth-flow';
import {Feedback} from '@/components/ui/primitives';

export default function Login({next=''}:{next?:string}){
  const[busy,setBusy]=useState(false);
  const[message,setMessage]=useState('');
  return <div className="auth-page">
    <AuthArtwork/>
    <div className="auth-form-side">
      <Link className="auth-back" href="/">← Back to website</Link>
      <div className="auth-form-wrap">
        <span className="eyebrow">WELCOME TO YOUR WORKSPACE</span>
        <h1>Good to see<br/>you again.</h1>
        <p>Sign in to continue your next business chapter.</p>
        <form aria-busy={busy} onSubmit={async event=>{
          event.preventDefault();
          if(busy)return;
          const data=new FormData(event.currentTarget);
          const email=String(data.get('email')||'').trim().toLowerCase();
          const password=String(data.get('password')||'');
          if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){setMessage('Enter a valid email address, for example you@company.com.');return}
          if(!password){setMessage('Enter your password to continue.');return}
          setBusy(true);
          setMessage('');
          let navigating=false;
          try{
            const response=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,next})});
            const result=await response.json().catch(()=>({}));
            if(response.ok){navigating=true;window.location.assign(result.redirect||next||'/account');return}
            setMessage(response.status===503?'Sign-in is temporarily unavailable. Please try again in a moment.':result.error||'Unable to sign in. Check your email and password.');
          }catch{setMessage('Unable to connect. Check your internet connection and try again.')}
          finally{if(!navigating)setBusy(false)}
        }}>
          <label>Email address<input name="email" type="email" required maxLength={254} autoComplete="username" placeholder="you@company.com"/></label>
          <PasswordInput autoComplete="current-password" minLength={1}/>
          <div className="auth-form-options"><span><ShieldCheck size={14}/>Secure account access</span><Link href="/forgot-password">Forgot password?</Link></div>
          <Feedback error message={message}/>
          <button className="button full-button" disabled={busy}>{<ArrowUpRight size={18}/>} {'Sign in to your account'}</button>
        </form>
        <div className="auth-switch">New to IMIKIA? <Link href="/register">Create account</Link></div>
      </div>
      <div className="auth-fineprint"><Link href="/privacy">Privacy policy</Link><span>© {new Date().getFullYear()} IMIKIA</span></div>
    </div>
  </div>;
}
