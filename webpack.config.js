const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: './css/app.[hash:8].css'
});
const cleanWebpackPlugin = new CleanWebpackPlugin(
  [
    'js',
    'css'
  ],
  {
    root: __dirname + '/app/public'
  }
);

const _config = {
  entry: './dva_src/src/index.js',
  output: {
    path: __dirname + '/app/public',
    publicPath: 'static',
    filename: 'js/app.[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: ['css-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.tpl$/,
        use: {
          loader: 'ejs-loader'
        }
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: './img/[name].[ext]'
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    extractLess,
    cleanWebpackPlugin
  ]
}

module.exports = _config;