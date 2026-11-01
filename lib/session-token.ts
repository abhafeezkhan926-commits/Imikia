import {createHmac,timingSafeEqual} from 'node:crypto';
export const ADMIN_COOKIE='imikia_admin';
export const CUSTOMER_COOKIE='imikia_customer';
export const SESSION_MAX_AGE=8*60*60*1000;
const MAX_TOKEN_LENGTH=512;
function sign(payload:string,scope:string,secret:string){return createHmac('sha256',secret).update(scope+payload).digest('hex')}
function sameSignature(given:string,expected:string){const a=Buffer.from(given||'','hex'),b=Buffer.from(expected,'hex');return a.length===b.length&&timingSafeEqual(a,b)}
export function roleToken(role:string,secret:string,now=Date.now()){const expiry=String(now+SESSION_MAX_AGE),payload=role+'.'+expiry;return payload+'.'+sign(payload,'role:',secret)}
export function staffToken(id:string,role:string,secret:string,now=Date.now()){const payload=id+'.'+role+'.'+(now+SESSION_MAX_AGE);return payload+'.'+sign(payload,'staff:',secret)}
export function staffTokenIdentity(token:string|undefined,secret:string|undefined,now=Date.now()):{id:string;role:'manager'|'staff'|'hr'}|null{if(!token||!secret||token.length>MAX_TOKEN_LENGTH)return null;const parts=token.split('.');if(parts.length!==4)return null;const[id,role,expiry,provided]=parts;if(!/^[0-9a-f]{24}$/i.test(id)||!['manager','staff','hr'].includes(role)||!/^\d+$/.test(expiry)||Number(expiry)<=now)return null;return sameSignature(provided,sign(id+'.'+role+'.'+expiry,'staff:',secret))?{id,role:role as 'manager'|'staff'|'hr'}:null}
export function tokenRole(token:string|undefined,secret:string|undefined,now=Date.now()):string|null{if(!token||!secret||token.length>MAX_TOKEN_LENGTH)return null;const identity=staffTokenIdentity(token,secret,now);if(identity)return identity.role;const parts=token.split('.');if(parts.length===2){const[expiry,provided]=parts;if(!/^\d+$/.test(expiry)||Number(expiry)<=now)return null;return sameSignature(provided,sign(expiry,'',secret))?'admin':null}if(parts.length!==3)return null;const[role,expiry,provided]=parts;if(!/^[a-z]+$/.test(role)||!/^\d+$/.test(expiry)||Number(expiry)<=now)return null;return sameSignature(provided,sign(role+'.'+expiry,'role:',secret))?role:null}
export function adminToken(secret:string,now=Date.now()){return roleToken('admin',secret,now)}
export function adminTokenValid(token:string|undefined,secret:string|undefined,now=Date.now()){return tokenRole(token,secret,now)!==null}
export function customerToken(id:string,secret:string,now=Date.now()){const expiry=String(now+SESSION_MAX_AGE),payload=id+'.'+expiry;return payload+'.'+sign(payload,'customer:',secret)}
export function customerTokenId(token:string|undefined,secret:string|undefined,now=Date.now()){if(!token||!secret||token.length>MAX_TOKEN_LENGTH)return null;const parts=token.split('.');if(parts.length!==3)return null;const[id,expiry,provided]=parts;if(!/^[0-9a-f]{24}$/i.test(id)||!/^\d+$/.test(expiry)||Number(expiry)<=now)return null;return sameSignature(provided,sign(id+'.'+expiry,'customer:',secret))?id:null}
