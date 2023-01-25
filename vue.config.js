const { defineConfig } = require('@vue/cli-service')

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module.rule('vue').use('vue-loader')
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  publicPath: ''
})
