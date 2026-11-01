import {NextResponse} from 'next/server';
import {currentUser} from '@/lib/session';
import {sameOrigin} from '@/lib/origin';
import {allowAttempt} from '@/lib/rate-limit';
import {cloudinaryReady,uploadAsset} from '@/lib/media-upload';
const allowed=['image/jpeg','image/png','image/webp'];
const maxBytes=5*1024*1024;
export async function POST(req:Request){const user=await currentUser();if(!user)return NextResponse.json({error:'Please sign in to change your profile picture.'},{status:401});if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});if(!allowAttempt('profile-avatar:'+user.email,15))return NextResponse.json({error:'Too many uploads. Please try again in a minute.'},{status:429});if(!cloudinaryReady())return NextResponse.json({error:'Photo uploads are temporarily unavailable.'},{status:503});try{const data=await req.formData();const file=data.get('file');if(!(file instanceof File)||!allowed.includes(file.type))return NextResponse.json({error:'Choose a JPG, PNG or WebP image.'},{status:400});if(file.size>maxBytes)return NextResponse.json({error:'Choose an image under 5 MB.'},{status:400});if(file.size===0)return NextResponse.json({error:'That image appears to be empty.'},{status:400});const result=await uploadAsset(file,allowed,maxBytes);return NextResponse.json({url:result.secure_url})}catch{return NextResponse.json({error:'Your photo could not be uploaded. Please try again.'},{status:503})}}
