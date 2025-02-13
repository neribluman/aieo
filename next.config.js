/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['xfunnel.ai'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  experimental: {
    mdxRs: true,
  },
}

module.exports = nextConfig 