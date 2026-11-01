import {currentUser} from '@/lib/session';
import {workspaceRole} from '@/lib/auth';
import Admin from './panel';
import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page(){const role=await workspaceRole();if(!role)redirect('/sign-in');const user=await currentUser();if(!user)redirect('/sign-in');return <Admin authenticated={true} connected={!!process.env.MONGODB_URI} email={user.email} name={user.name} role={role}/>}
