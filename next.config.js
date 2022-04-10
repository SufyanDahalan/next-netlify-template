/** @type {import('next').NextConfig} */
const withOptimizedImages = require('next-optimized-images')
module.exports = withOptimizedImages({
    images: {
        disableStaticImages: true
      },
    reactStrictMode: true,
    basePath: process.env.NODE_ENV !== 'development' ? process.env.basePath : '',
    assetPrefix: process.env.NODE_ENV !== 'development' ? process.env.assetPrefix : '', 
    webpack: (cfg) => {
      cfg.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: { mode: ["react-component"] },
      });
      return cfg;
    },
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' }}}
  });
  