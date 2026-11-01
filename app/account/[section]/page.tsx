import {currentCustomer} from '@/lib/customer-auth';
import {isAdmin} from '@/lib/auth';
import {redirect,notFound} from 'next/navigation';
import CustomerWorkspace from '@/components/dashboard/customer-workspace';
export const metadata={title:'Customer account',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{section:string}>}){if(await isAdmin())redirect('/admin');const customer=await currentCustomer();if(!customer)redirect('/sign-in');const{section}=await params;if(!['profile','quotations','settings','security'].includes(section))notFound();return <CustomerWorkspace customer={customer} section={section}/>}
