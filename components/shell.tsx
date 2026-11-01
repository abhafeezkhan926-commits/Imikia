import {Header} from './layout/header';
import {Footer} from './layout/footer';
import {settings} from '@/lib/db';
export async function Shell({children}:{children:React.ReactNode}){let config=null;try{config=await settings()}catch{}return <><Header config={config}/><main id="main-content">{children}</main><Footer config={config}/></>}
