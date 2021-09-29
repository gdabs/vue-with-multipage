const WebpackChain = require('webpack-chain');
const buildClient = async () => {
  const { startClientBuild } = await import('./utils');
  const { getClientWebpack } = await import('./webpack/client');
  const clientConfigChain = new WebpackChain();
  await startClientBuild(getClientWebpack(clientConfigChain));
};

export default buildClient;
