'use client';
import {useState} from 'react';
import Link from 'next/link';
import {AuthArtwork,PasswordInput} from './auth-flow';
import {Feedback,Spinner} from '@/components/ui/primitives';
export default function RegisterForm(){
  const[busy,setBusy]=useState(false);
  const[message,setMessage]=useState('');
  return <div className="auth-page">
    <AuthArtwork/>
    <div className="auth-form-side">
      <Link className="auth-back" href="/">← Back to website</Link>
      <div className="auth-form-wrap">
        <span className="eyebrow">YOUR IMIKIA ACCOUNT</span>
        <h1>Create account</h1>
        <p>Create an account to manage your product enquiries.</p>
        <form aria-busy={busy} onSubmit={async event=>{
          event.preventDefault();
          if(busy)return;
          const data=new FormData(event.currentTarget);
          const name=String(data.get('name')||'').trim();
          const email=String(data.get('email')||'').trim().toLowerCase();
          const password=String(data.get('password')||'');
          const confirmPassword=String(data.get('confirmPassword')||'');
          if(name.length<2){setMessage('Enter your full name using at least two characters.');return}
          if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){setMessage('Enter a valid email address, for example you@company.com.');return}
          if(password.length<8){setMessage('Choose a password of at least eight characters.');return}
          if(password!==confirmPassword){setMessage('The two passwords do not match. Please re-enter them.');return}
          setBusy(true);
          setMessage('');
          let navigating=false;
          try{
            const response=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password,confirmPassword})});
            const result=await response.json().catch(()=>({}));
            if(response.ok){navigating=true;window.location.assign(result.redirect||'/');return}
            setMessage(result.error||'Unable to create your account. Please try again.');
          }catch{setMessage('Unable to connect. Check your internet connection and try again.')}
          finally{if(!navigating)setBusy(false)}
        }}>
          <label>Full name<input name="name" required minLength={2} maxLength={100} autoComplete="name"/></label>
          <label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email"/></label>
          <PasswordInput/>
          <PasswordInput name="confirmPassword" label="Confirm password"/>
          <Feedback error message={message}/>
          <button className="button full-button" disabled={busy}>{busy?<Spinner/>:null}{busy?'Creating account…':'Create account'}</button>
        </form>
        <div className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></div>
      </div>
      <div className="auth-fineprint"><Link href="/privacy">Privacy policy</Link><span>© {new Date().getFullYear()} IMIKIA</span></div>
    </div>
  </div>;
}
