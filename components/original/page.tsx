import {notFound} from 'next/navigation';
import {originalPage} from '@/lib/original-render';
import OriginalPage from './original-page';
export default async function Original({path,query={},productSlug}:{path:string;query?:Record<string,string|undefined>;productSlug?:string}){const page=await originalPage(path,query,productSlug);if(!page)notFound();return <OriginalPage {...page}/>}
