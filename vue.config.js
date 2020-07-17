const path = require("path");
const defaultSettings = require("./src/settings.js");
const PurifyCSSPlugin=require('purifycss-webpack'); //css优化去重复无效代码
const glob=require('glob');  //css优化

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue-element-template"; // page title
const port = 8099;
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false, //process.env.NODE_ENV === 'development', eslint校验与否
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [
      new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(__dirname, 'app/*.html')),
      })
    ]
  },
};
