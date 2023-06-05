// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
let proxyObj = {}
proxyObj['/api']={
ws:false,
target:' http://106.54.171.11:9002',
changeOrigin:true,
pathRewrite:{
'^/': ''
}
}
module.exports={
devServer:{
host:'localhost',
port:8080,
proxy:proxyObj
}
}
