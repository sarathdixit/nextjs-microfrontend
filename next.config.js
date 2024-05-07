const NextFederationPlugin = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const federatedConfig = {
  name: "manage",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./manageHome": "./src/component/manageHome.tsx",
    "./manageTypescript": "./src/component/manageTypescript.tsx",
  },
  shared: {},
};

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // TypeScript configuration
  },
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin(federatedConfig),
      new FederatedTypesPlugin({ federationConfig: federatedConfig })
    );

    return config;
  },
};

module.exports = nextConfig;
