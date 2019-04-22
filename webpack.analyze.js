const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DedupCSSPlugin = require('dedupcss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    sourceMap: false,
                    compress: {
                        unused: true,
                        unsafe: true,
                        unsafe_comps: true,
                        //pure_getters: true, // not working if set to true
                        warnings: false,
                        //screw_ie8: true,
                        dead_code: true, // big one--strip code that will never execute
                        // drop_debugger: true,
                        // conditionals: true,
                        // evaluate: true,
                        // drop_console: true, // strips console statements
                        // sequences: true,
                        // booleans: true,
                        // if_return: true,
                        // join_vars: true,        
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: {
                        comments: false
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                    exclude: [/\.min\.js$/gi], // skip pre-minified libs
                }
            })
        ]
    },
    plugins: [
        new DedupCSSPlugin({}),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new BundleAnalyzerPlugin()
    ]
});