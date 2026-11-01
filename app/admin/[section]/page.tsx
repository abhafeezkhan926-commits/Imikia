import {currentUser} from '@/lib/session';
import {workspaceRole} from '@/lib/auth';
import {redirect,notFound} from 'next/navigation';
import Admin from '../panel';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{section:string}>}){const role=await workspaceRole();if(!role)redirect('/sign-in');const user=await currentUser();if(!user)redirect('/sign-in');const{section}=await params;if(!['products','categories','inventory','quotations','customers','hr','activity','content','articles','settings','inquiries','profile','security'].includes(section))notFound();return <Admin connected={!!process.env.MONGODB_URI} section={section} email={user.email} name={user.name} role={role}/>}
