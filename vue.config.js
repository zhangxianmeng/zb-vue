const express = require('express')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

// 测试地址
function getBaseUrl(mode) {
  let res = ''
  switch (mode) {
    //测试环境
    case 1:
      res = 'http://zbvue.mzc001.com'
      break
    //线上环境
    case 2:
      res = 'https://zb1100.com'
  }
  return res
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: '/',

  // where to output built files
  outputDir: './dist',

  // where to put static assets (js/css/img/font/...)
  assetsDir: 'static',

  // 不需要生产环境的 source map
  productionSourceMap: false,

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8000,
    // https: false,
    hotOnly: false,
    proxy: {
      '/api/pay/thirdPaymentBank/list': {
        target: 'http://zb11.com',
        changeOrigin: true,
      },
      '/api/personal/carouselMapConfig/list': {
        target: 'http://zb11.com',
        changeOrigin: true,
      },
      '/1.0': {
        target: getBaseUrl(2),
        changeOrigin: true,
      },
    },
    before: app => {
      // `app` 是一个 express 实例
      let apiRouter = express.Router()
      let fs = require('fs')
      apiRouter.route('/:apiName').all((req, res) => {
        fs.readFile('./db.json', 'utf8', (err, data) => {
          if (err) throw err
          data = JSON.parse(data)
          if (data[req.params.apiName]) {
            res.json(data[req.params.apiName])
          } else {
            res.send('no such api name')
          }
        })
      })
      app.use('/api', apiRouter)
    },

  },

  lintOnSave: true,
  chainWebpack: (config) => {

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('vue$', 'vue/dist/vue.min')
      .set('MComponents', resolve('src/pages/mobile/components'))
  },
  configureWebpack: config => {
    // 生产模式
    if (isProduction) {
      // 添加自定义代码压缩配置
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
  }
}