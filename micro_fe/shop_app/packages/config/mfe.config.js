module.exports = {
  app_shell: {
    name: 'app_shell',
    port: 3000,
  },
  checkout_app: {
    name: 'checkout_app',
    port: 3001,
  },
  product_app: {
    name: 'product_app',
    port: 3002,
  },
  shared_store: {
    name: 'shared_store',
    port: 3003,
  },
  exposes: {
    checkout_app: {
      './App': './src/ExportApp',
    },
    product_app: {
      './App': './src/App',
    },
    shared_store: {
      './store': './src/bootstrap',
    },
  },
  shared: {
    shared_store: {
      effector: {
        singleton: true,
        eager: true,
      },
      'effector-react': {
        singleton: true,
      },
      'effector-vue': {
        singleton: true,
      },
    },
    checkout_app: {
      ...this.shared_store,
      react: {
        singleton: true,
      },
      'react-dom': { singleton: true },
      vue: { singleton: true, eager: true },
    },
    product_app: {
      ...this.shared_store,
      react: {
        singleton: true,
      },
      'react-dom': { singleton: true },
    },
    app_shell: {
      ...this.shared_store,
      react: {
        singleton: true,
      },
      'react-dom': { singleton: true },
      vue: { singleton: true, eager: true },
    },
  },
  fileName: 'remoteEntry.js',
  getRemoteEntry(name) {
    return `${name}@//localhost:${this[name].port}/${this.fileName}`;
  },
};
