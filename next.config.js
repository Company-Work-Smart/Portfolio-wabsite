const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  output: 'export',
  async redirects() {
    return [];
  },
});

module.exports = nextConfig;
