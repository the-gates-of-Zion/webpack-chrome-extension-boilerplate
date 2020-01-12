const path = require('path');// just to manipulate path
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    keyNameA: './src/index.js',
    keyNameB: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({

      title: 'Output Management',
      template: 'src/index.html',

    }),

  ],
  output: {
    filename: '[name].bundle.js',
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