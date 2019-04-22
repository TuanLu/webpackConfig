const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    watchOptions: {
        poll: true
    },
    stats: {
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false
      },
    performance: {
        hints: false
    },
    devServer: {
        contentBase: path.join(__dirname, 'app'),
        compress: false,
        port: 3000
    }
});