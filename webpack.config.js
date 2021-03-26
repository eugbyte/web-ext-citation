const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  mode: "development",
  entry: {
      "content-script": "./src/content-script/content-script.ts",
      "background-script": "./src/background-script/background-script.ts"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
};