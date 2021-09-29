const WebpackChain = require('webpack-chain');
const startClient = async () => {
  const { startClientServer } = await import('./utils');
  const { getClientWebpack } = await import('./webpack/client');
  const clientConfigChain = new WebpackChain();
  await startClientServer(getClientWebpack(clientConfigChain));
};

export default startClient;
