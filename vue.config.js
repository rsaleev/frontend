const { defineConfig } = require('@vue/cli-service')
const { VuetifyLoaderPlugin } = require('vuetify-loader')

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module.rule('vue').use('vue-loader')
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
})
