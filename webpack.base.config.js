const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './build/'),
    /*publicPath: '/'*/
  },
  module : {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
     {
      test: /\.(woff(2)?)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js'
            }
          }
        }
        
      ]
    },
    {
      test: /\.s(a|c)ss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new CopyWebpackPlugin([
        { from: './src/img', to: 'img' },
        { from: './src/static', to: '' },
        { from: './src/fonts', to: 'fonts' },
        { from: './*.html', to: '' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      minify: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
  
}