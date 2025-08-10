/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@breeze/ui', '@breeze/types', '@breeze/config'],
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig