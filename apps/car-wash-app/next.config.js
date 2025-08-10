/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@breeze/ui', '@breeze/types', '@breeze/config'],
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;