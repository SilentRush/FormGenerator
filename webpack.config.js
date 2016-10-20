var webpack = require('webpack');

module.exports = {
  entry: "./app/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/public",
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude:/(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  })
]
};
