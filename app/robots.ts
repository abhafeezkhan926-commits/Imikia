import {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/account','/hr','/sign-in','/register','/forgot-password','/verify-otp','/reset-password','/accept-invitation']},sitemap:(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000')+'/sitemap.xml'}}
