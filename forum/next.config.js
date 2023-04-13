/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
};

module.exports = nextConfig;
