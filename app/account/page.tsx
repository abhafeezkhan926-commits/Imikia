import {currentCustomer} from '@/lib/customer-auth';
import {isAdmin} from '@/lib/auth';
import {redirect} from 'next/navigation';
import CustomerWorkspace from '@/components/dashboard/customer-workspace';
export const metadata={title:'Customer account',robots:{index:false,follow:false}};
export default async function Page(){if(await isAdmin())redirect('/admin');const customer=await currentCustomer();if(!customer)redirect('/sign-in');return <CustomerWorkspace customer={customer}/>}
