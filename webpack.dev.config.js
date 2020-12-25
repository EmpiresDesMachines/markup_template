const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    contentBase: './build',
    compress: true,
    port: 9000,
    overlay: {
      warnings: false,
      errors: true
    },
    clientLogLevel: 'silent'
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});