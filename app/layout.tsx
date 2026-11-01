import type { Metadata } from 'next';
import './globals.css';
import './polish.css';
import './appearance.css';
import './appearance-controls.css';
import './premium.css';
import ThemeProvider from '@/components/profile/theme-provider';
import ProfileMenu from '@/components/profile/profile-menu';
import {currentUser,type SessionUser} from '@/lib/session';
import {userPreferences} from '@/lib/user-preferences';
export const metadata:Metadata={title:{default:'IMIKIA | Small wheels. Big possibilities.',template:'%s | IMIKIA'},description:'Children’s ride-on vehicles, product sourcing and quality control for international buyers.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://imikia.vercel.app'),openGraph:{type:'website',siteName:'IMIKIA',title:'IMIKIA | Small wheels. Big possibilities.',description:'Children’s ride-on vehicles, product sourcing and quality control for international buyers.'},twitter:{card:'summary_large_image',title:'IMIKIA | Small wheels. Big possibilities.',description:'Children’s ride-on vehicles and B2B sourcing for international buyers.'},icons:{icon:'/icon.svg',shortcut:'/icon.svg',apple:'/icon.svg'}};
export default async function Layout({children}:{children:React.ReactNode}){let user:SessionUser|null=null;try{user=await currentUser()}catch{}const initial=await userPreferences(user);return <html lang="en" data-mode={initial.mode==='dark'?'dark':'light'} data-theme={initial.theme}><body><ThemeProvider initial={initial} user={user}>{children}<ProfileMenu/></ThemeProvider></body></html>}
