/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Add this line
    },
  },
  // Also add this outside experimental for Next.js 16+
  serverActions: {
    bodySizeLimit: '10mb', // Add this line too
  },
}

module.exports = nextConfig