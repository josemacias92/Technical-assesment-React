const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         test: /node_modules\/(?!antd\/).*/,
  //         name: "vendors",
  //         chunks: "all",
  //       },
  //       // This can be your own design library.
  //       antd: {
  //         test: /node_modules\/(antd\/).*/,
  //         name: "antd",
  //         chunks: "all",
  //       },
  //     },
  //   },
  //   runtimeChunk: {
  //     name: "manifest",
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              name: '/public/icons/[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
  // performance: {
  //   hints: "warning",
  //   // Calculates sizes of gziped bundles.
  //   assetFilter: function (assetFilename) {
  //     return assetFilename.endsWith(".js.gz");
  //   },
  // }
};