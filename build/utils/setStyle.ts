import * as WebpackChain from 'webpack-chain';

const isDev = process.env.NODE_ENV !== 'production';

interface StyleOptions {
  rule: string;
  include?: RegExp | RegExp[];
  exclude?: RegExp | RegExp[];
  modules: boolean;
  loader?: string;
  importLoaders: number;
}

const setStyle = (chain: WebpackChain, reg: RegExp, options: StyleOptions) => {
  const { include, exclude, modules, importLoaders, loader } = options;
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const loadModule = require.resolve;

  const userCssloaderOptions = {};
  const cssloaderOptions = {
    importLoaders: importLoaders,
    modules: modules,
  };
  Object.assign(cssloaderOptions, userCssloaderOptions);

  const postCssPlugins = []; // 用户自定义 postcss 插件
  const postCssOptions = Object.assign(
    {
      ident: 'postcss',
      plugins: () =>
        [
          require('postcss-opacity'),
          require('postcss-assets')({
            cachebuster: true,
          }),
          require('postcss-color-rgba-fallback')({
            properties: [
              'background-color',
              'background',
              'color',
              'border',
              'border-color',
              'outline',
              'outline-color',
              'box-shadow',
            ],
          }),
          require('postcss-px2rem-exclude')({
            remUnit: 100,
            exclude: /node_modules|folder_name/i,
          }),
          require('postcss-flexbugs-fixes'),
          require('postcss-discard-comments'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ].concat(postCssPlugins),
    },
    {}
  ); // 合并用户自定义 postcss options

  chain.module
    .rule(options.rule)
    .test(reg)
    .when(Boolean(include), rule => {
      include && rule.include.add(include).end();
    })
    .when(Boolean(exclude), rule => {
      exclude && rule.exclude.add(exclude).end();
    })
    .when(isDev, rule => {
      rule.use('hmr').loader(loadModule('css-hot-loader')).end();
    })
    .use('MiniCss')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader(loadModule('css-loader'))
    .options(cssloaderOptions)
    .end()
    .use('postcss-loader')
    .loader(loadModule('postcss-loader'))
    .options(postCssOptions)
    .end()
    .when(Boolean(loader), rule => {
      loader &&
        rule
          .use(loader)
          .loader(loadModule(loader))
          .when(loader === 'less-loader', rule => {
            rule.options(
              {
                lessOptions: {
                  javascriptEnabled: true,
                },
              }
            );
          })
          .when(loader === 'sass-loader', rule => {
            rule.options({});
          })
          .end();
    });
};

export { setStyle };
