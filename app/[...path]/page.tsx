import Original from '@/components/original/page';
export const dynamic='force-dynamic';
export default async function Page({params,searchParams}:{params:Promise<{path:string[]}>;searchParams:Promise<Record<string,string>>}){const{path}=await params;return <Original path={'/'+path.join('/')} query={await searchParams}/>}
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}){const{path}=await params;return (await import('@/lib/original-render')).originalMetadata('/'+path.join('/'))}
