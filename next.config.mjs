/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },  // or for production only:
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://variant-b.tc-vercel.dev' : '',
}

export default nextConfig
