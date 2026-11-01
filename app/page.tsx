import Original from '@/components/original/page';
export const dynamic='force-dynamic';
export default function Page(){return <Original path="/"/>}
export {homeMetadata as generateMetadata};
async function homeMetadata(){return (await import('@/lib/original-render')).originalMetadata('/')}
