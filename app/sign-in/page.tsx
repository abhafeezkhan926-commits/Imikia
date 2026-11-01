import {redirect} from 'next/navigation';
import {currentCustomer} from '@/lib/customer-auth';
import {isAdmin} from '@/lib/auth';
import Login from './login';
export const dynamic='force-dynamic';
export const metadata={title:'Sign in',robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{next?:string}>}){if(await isAdmin())redirect('/admin');if(await currentCustomer())redirect('/account');const{next}=await searchParams;return <Login next={typeof next==='string'?next:''}/>}
