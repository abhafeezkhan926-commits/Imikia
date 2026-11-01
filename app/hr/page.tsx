import {redirect} from 'next/navigation';
import {isAdmin} from '@/lib/auth';
export const metadata={title:'Team workspace',robots:{index:false,follow:false}};
export default async function Page(){if(!await isAdmin())redirect('/sign-in');redirect('/admin/hr')}
