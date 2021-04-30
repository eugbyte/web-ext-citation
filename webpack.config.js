const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    // sso.agc.gov.sg
    'content-scripts/sso.agc.gov.sg/index': './src/content-scripts/sso.agc.gov.sg/index.ts',
    'background-scripts/sso.agc.gov.sg/index': './src/background-scripts/sso.agc.gov.sg/index.ts',
    // lawnet
    'content-scripts/lawnet/index': './src/content-scripts/lawnet/index.ts',
    'index': './src/index.tsx'
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
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
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
