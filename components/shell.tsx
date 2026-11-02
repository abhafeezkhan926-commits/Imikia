import {Header} from './layout/header';
import {Footer} from './layout/footer';
import {settings} from '@/lib/db';
export async function Shell({children,config:providedConfig}:{children:React.ReactNode;config?:Awaited<ReturnType<typeof settings>>}){let config=providedConfig??null;if(!providedConfig){try{config=await settings()}catch{}}return <><Header config={config}/><main id="main-content">{children}</main><Footer config={config}/></>}
