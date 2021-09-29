import fs from 'fs';
import { join } from 'path';
import webpack from 'webpack';
import webpackMock from 'mocker-api';
import { promisify } from 'util';
const WebpackDevServer = require('webpack-dev-server-ssr');
const webpackPromisify = promisify<webpack.Configuration, webpack.Stats>(webpack);

const mockEntrys = fs.readdirSync(join(process.cwd(), './mock'));
const mockFiles = mockEntrys.map(item => join(process.cwd(), `./mock/${item}`));

const startClientServer = async (webpackConfig: webpack.Configuration) => {
  const webpackStatsOption = {
    assets: true, // 添加资源信息
    cachedAssets: false, // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    children: false, // 添加 children 信息
    chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    colors: true, // 以不同颜色区分构建信息
    modules: false, // 添加构建模块信息
    warnings: false,
    entrypoints: false,
  };
  const webpackDevServerConfig = {
    stats: webpackStatsOption,
    disableInfo: true, // 关闭webpack-dev-server 自带的server Info信息
    disableHostCheck: true,
    publicPath: process.env.PUBLIC_URL,
    hotOnly: true,
    host: '0.0.0.0',
    sockPort: process.env.PORT,
    hot: true,
    port: process.env.PORT,
    https: false,
    clientLogLevel: 'error',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    before(app) {
      webpackMock(app, mockFiles);
    },
  };
  return await new Promise(resolve => {
    const compiler = webpack(webpackConfig);

    const server = new WebpackDevServer(compiler, webpackDevServerConfig);
    compiler.hooks.done.tap('DonePlugin', () => {
      resolve(undefined);
    });
    server.listen(3000, '0.0.0.0');
  });
};

const startClientBuild = async (webpackConfig: webpack.Configuration) => {
  await webpackPromisify(webpackConfig);
};

export { startClientServer, startClientBuild };
