/** @type {import('next').NextConfig} */
const withOptimizedImages = require('next-optimized-images')
module.exports = withOptimizedImages({
    reactStrictMode: true,
    basePath: process.env.basePath,
    assetPrefix: process.env.assetPrefix,
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
  