import Original from '@/components/original/page';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string>>}){return <Original path="/products" query={await searchParams}/>}
export async function generateMetadata(){return (await import('@/lib/original-render')).originalMetadata('/products')}
