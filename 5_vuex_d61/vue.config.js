const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve:{
      alias:{
        "a": "@/a",//自己配置,但会被jsconfig.json中配置覆盖,同时没有代码提示,使用推荐去jsconfig.json中配置(也就是方法一)
        "Components": "@/Components"
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': true,
        // 其他特性标志
      })
    ]
  }
})
