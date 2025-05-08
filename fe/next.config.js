/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: process.env.NODE_ENV === 'production' ? '/d8-all-SimWork' : '',  // Updated repository name
  images: {
    unoptimized: true,  // Required for static export
  },
  // Next.js 15 already has app directory as default, so we don't need to specify it

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
