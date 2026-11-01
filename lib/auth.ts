import {timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';
import {ADMIN_COOKIE,adminToken,tokenRole,roleToken as issueRoleToken,staffToken as issueStaffToken,staffTokenIdentity} from './session-token';
import {roleAllows} from './access';
export {roleAllows} from './access';
export function equal(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
function secret(){const value=process.env.ADMIN_SESSION_SECRET;if(!value||value.length<32)throw new Error('Session configuration unavailable');return value}
export function token(){return adminToken(secret())}
export function roleToken(role:string){return issueRoleToken(role,secret())}
export function staffToken(id:string,role:string){return issueStaffToken(id,role,secret())}
export async function staffIdentity(){return staffTokenIdentity((await cookies()).get(ADMIN_COOKIE)?.value,process.env.ADMIN_SESSION_SECRET)}
export async function workspaceRole(){const configured=process.env.ADMIN_SESSION_SECRET;if(!configured||configured.length<32)return null;return tokenRole((await cookies()).get(ADMIN_COOKIE)?.value,configured)}
export async function isAdmin(){return (await workspaceRole())==='admin'}
export async function canAccess(area:string){return roleAllows(await workspaceRole(),area)}
