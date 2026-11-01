import type {NextConfig} from 'next';
const config:NextConfig={experimental:{cpus:2},images:{remotePatterns:[{protocol:'https',hostname:'res.cloudinary.com'},{protocol:'http',hostname:'www.imikia.com',pathname:'/uploads/**'},{protocol:'https',hostname:'www.imikia.com',pathname:'/uploads/**'}]}};
export default config;
