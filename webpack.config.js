/** ↓ エディタで補完を効かせるための JSDoc */
/** @type {import('webpack').Configuration} */

const { resolve } = require('path')

// development モードか否か？
const isDev = process.env.NODE_ENV === "development"

const config = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : undefined,
  entry: {
    main: './src/js/main.js',
  },
  output: {
    path: resolve(__dirname, 'dist/js'),
    publicPath: '/js/',
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: resolve(__dirname, "dist/"),
    },
    open: true,
  },
  module: {
    rules: [
      {
        // 拡張子 js のファイル（正規表現）
        test: /\.js$/,
        // ローダーの指定
        loader: "babel-loader",
      },
    ],
  },
}

// 設定を CommonJS 形式でエクスポート
module.exports = config;
