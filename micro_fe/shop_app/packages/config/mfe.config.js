module.exports = {
  app_shell: {
    port: 3000,
  },
  checkout_app: {
    port: 3001,
  },
  product_app: {
    port: 3002,
  },
  shared_store: {
    port: 3003,
  },
  remotes: {
    checkout_app: {},
    product_app: {},
    shared_store: {},
  },
  exposes: {
    checkout_app: {},
    product_app: {},
    shared_store: {},
  },
  fileName: "remoteEntry.js",
};
