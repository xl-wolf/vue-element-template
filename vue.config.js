const path = require("path");
const defaultSettings = require("./src/settings.js");
// const glob = require("glob-all");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
const resolve = dir => path.join(__dirname, dir);
// console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);


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
    config.resolve.alias.set("@", resolve("src"))
  },


  configureWebpack: config => {
    // console.log('config',config)
    // const plugins = [];
    // if (IS_PROD) {
    //   plugins.push(
    //     new PurgecssPlugin({
    //       paths: glob.sync([resolve("./**/*.vue")]),
    //       extractors: [
    //         {
    //           extractor: new class Extractor {
    //             static extract(content) {
    //               const validSection = content.replace(
    //                 /<style([\s\S]*?)<\/style>+/gim,
    //                 ""
    //               );
    //               return (
    //                 validSection.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
    //               );
    //             }
    //           },
    //           extensions: ["html", "vue"]
    //         }
    //       ],
    //       whitelist: ["html", "body"],
    //       whitelistPatterns: [
    //         /el-.*/,
    //         /-(leave|enter|appear)(|-(to|from|active))$/,
    //         /^(?!cursor-move).+-move$/,
    //         /^router-link(|-exact)-active$/
    //       ],
    //       whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
    //     })
    //   );
    // }
    // config.plugins = [...config.plugins, ...plugins]
    config.name = name
  }
};
