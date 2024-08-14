/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
      },
      {
        hostname: 'res.cloudinary.com',
        pathname: '/df2grpldq/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '6MB',
    },
  },
};

export default nextConfig;
