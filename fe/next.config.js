/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: process.env.NODE_ENV === 'production' ? '/sx15_2' : '',  // Replace with your repository name
  images: {
    unoptimized: true,  // Required for static export
  },
  // Disable server-side features when exporting
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
