import AuthFlow from '@/components/auth/auth-flow';
export const metadata={title:'Account access',robots:{index:false,follow:false}};
export default function Page(){return <AuthFlow flow='verify-otp'/>}
