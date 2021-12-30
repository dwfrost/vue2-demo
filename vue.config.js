// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        // https://v4.webpack.js.org/configuration/dev-server/#devserverdisablehostcheck
        disableHostCheck: true
    },
    configureWebpack: config => {
        // if (process.env.NODE_ENV === 'production') {
        //     config.plugins.push(new BundleAnalyzerPlugin())
        // }
        // config.plugins.push(
        //     new CompressionPlugin({
        //         test: /\.js$|\.html$|\.css$/, // 匹配文件名
        //         // filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        //         // minRatio: 1, // 压缩率小于1才会压缩
        //         threshold: 10240 // 对超过10k的数据压缩
        //     })
        // )
    }
}
