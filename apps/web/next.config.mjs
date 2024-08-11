/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
