/** @type {import('next').NextConfig} */
const repo   = 'pentasus-dragonboat.github.io';              // GitHub repo name
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  images: { unoptimized: true },                    // required for static export
  basePath:  isProd ? `/${repo}` : '',              // e.g. /pentasus-dragon-boat
  assetPrefix: isProd ? `/${repo}` : '',            // same as basePath
  trailingSlash: true,
};
