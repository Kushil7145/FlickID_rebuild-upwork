/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  experimental: {
    outputFileTracingRoot: './',
  },
}

export default nextConfig;
