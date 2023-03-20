// next.config.js
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com', 'https://w3s.link/ipfs/'],
  },
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations here
    config.resolve.alias['@components'] = path.join(__dirname, 'components');
    config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['@styles'] = path.join(__dirname, 'styles');
    return config;
  },
};
