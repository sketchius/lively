const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './dist',
  devServer: {
    port: 8081
  }
})


