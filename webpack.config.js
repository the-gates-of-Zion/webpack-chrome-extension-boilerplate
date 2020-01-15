const path = require('path');// just to manipulate path
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');


module.exports = {
  mode: 'development',
  entry: {
    popup: './src/popup/popup.js',
    options: './src/options/options.js',
    content: './src/content/content.js',
    background: './src/background/background.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ChromeExtensionReloader(),
    new HtmlWebpackPlugin({
      title: 'this is popup',
      filename: 'popup/popup.html',
      template: 'src/popup/popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      title: 'this is options',
      filename: 'options/options.html',
      template: 'src/options/options.html',
      chunks: ['options']
    }),

    ///*
    new CopyWebpackPlugin([
      { from: 'src/manifest.json', to: path.resolve(__dirname, 'dist') },
      { from:'src/imgs',to: path.resolve(__dirname, 'dist/imgs/')} 
    ]),
    //*/

  ],
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',//npm install --save-dev style-loader
          'css-loader',//npm install --save-dev css-loader
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',// npm install --save-dev file-loader 
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          //'file-loader',
          'url-loader?limit=100000', 
        ],
      },
      {
        test: /\.(xml)$/,
        use: [
          'xml-loader',
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,//this excludes the node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
    ],
   },
};