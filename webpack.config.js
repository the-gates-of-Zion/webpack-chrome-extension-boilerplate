const path = require('path');// just to manipulate path
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getEntry = (sourceDir = 'src') => {
  return {
    popup: path.resolve(__dirname, `${sourceDir}/popup/popup.jsx`),
    options: path.resolve(__dirname, `${sourceDir}/options/options.jsx`),
    content: path.resolve(__dirname, `${sourceDir}/content/content.js`),
    background: path.resolve(__dirname, `${sourceDir}/background/background.js`),
  };
};


/**
popup: './src/popup/popup.js',
options: './src/options/options.js',
content: './src/content/content.js',
background: './src/background/background.js',
 */

const getOutput = (browserDir, outputDir = 'dev') => {
  return {
    path: path.resolve(__dirname, `${outputDir}/${browserDir}`),
    filename: '[name]/[name].js',
  };
};

module.exports = {
  mode: 'development',
  entry: {
    keyNameA: './src/index.js',
    keyNameB: './src/print.js',
    background: './src/background/background.js',
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
    /*
    new HtmlWebpackPlugin({

      title: 'Output Management',
      template: 'src/index.html',

    }),*/
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