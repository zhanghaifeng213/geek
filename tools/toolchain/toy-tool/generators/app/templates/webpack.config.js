const path = require('path');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {pragma: "createElement"}]]
          }
        },
      },
      // {
      //   test: /\.view/,
      //   use: {
      //     loader: require.resolve("./myloader.js"),
      //   },
      // },
      // {
      //   test: /\.css$/,
      //   use: {
      //     loader: require.resolve("./cssloader.js"),
      //   },
      // }
    ]
  },
  plugins: [
    new (require('html-webpack-plugin'))
  ],
  mode: 'development',
  optimization: {
    minimize: false
  },
  devServer: {
    open: true,
    compress: false,
    static: {
      directory: path.join(__dirname, 'src'),
    },
  }
}