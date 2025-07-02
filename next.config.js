/** @type {import('next').NextConfig} */
// For pentasus-dragonboat.github.io - serves from root domain
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  images: { unoptimized: true },                    // required for static export
  
  // For .github.io repos, basePath should be empty since it serves from root
  basePath: '',
  assetPrefix: '',
  
  // Optional: Add trailing slash for better GitHub Pages compatibility
  trailingSlash: true,
};