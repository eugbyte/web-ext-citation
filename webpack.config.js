const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
      "content-script": "./src/content-script/content-script.ts",
      "background-script": "./src/background-script/background-script.ts",
      "index": "./src/index.tsx"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        use: [ 'css-loader', 'style-loader', MiniCssExtractPlugin.loader],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },  
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }), 
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'src/static' }
      ]
    })
  ]
};