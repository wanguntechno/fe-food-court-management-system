/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'dev-semesta.wangun.co',
        port: ""
      }
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/:path*` : 'https://dev-semesta.wangun.co/api/:path*'
  //     }
  //   ]
  // }
};

export default nextConfig;
