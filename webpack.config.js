const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const stage = "development"

module.exports = {
  mode: stage,
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    // sso.agc.gov.sg
    'content-scripts/sso.agc.gov.sg/index': './src/content-scripts/sso.agc.gov.sg/index.ts',
    'background-scripts/index': './src/background-scripts/index.ts',
    // lawnet
    'content-scripts/lawnet/index': './src/content-scripts/lawnet/index.ts',
    'index': './src/index.tsx',
    // polyfill
    'browser-polyfill': './node_modules/webextension-polyfill/dist/browser-polyfill.js'

  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({ template: './src/asset/index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/asset',
          globOptions: {
            ignore: ['**/asset/index.html']
          }
        }
      ]
    })
  ]
}
