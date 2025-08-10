/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@breeze/ui', '@breeze/types', '@breeze/config'],
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Required for static export
  },
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  // Configure base path for GitHub Pages (will be repository name)
  basePath: process.env.NODE_ENV === 'production' ? '/breeze-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/breeze-platform/' : '',
}

module.exports = nextConfig