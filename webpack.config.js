const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ReactWebConfig = require('react-web-config/lib/ReactWebConfig').ReactWebConfig;
const envFilePath = path.resolve(__dirname, '.env');

module.exports = (env = {}, argv) => {
  const config = {
    name: 'ReactNativeApp',
    entry: {
      main: './index.web.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].js`,
      chunkFilename: `[name].async.js`,
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./web/index.html`,
        filename: `index.html`,
        inject: 'head',
        chunks: ['main'],
      }),
      // ReactWebConfig(envFilePath),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        // 'react-native': 'react-native-web',
        'react-native$': 'react-native-web',
        'react-native-config$': path.resolve(__dirname, './src/env-config/index.js'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, `dist/`),
      compress: false,
      port: 9070,
      https: true,
    },
  };

  return config;
};
