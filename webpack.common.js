const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        rungrinh: ['whatwg-fetch', './src/index.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './src'),
                ],
                loader: 'babel-loader',
                options: {
                    plugins: [
                        'lodash',
                        'minify-dead-code-elimination'
                    ]
                },
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            }, 
            {
                test: /\.(png|jpg|JPG|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ]
            }
        ],
    },
    output: {
        path: path.join(__dirname, 'app'),
        filename: 'js/bundle.min.js'
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    plugins: [
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/
        }),
        new webpack.DefinePlugin({
            __PROCESS__: {
                'ENV': JSON.stringify(process.env.ENV),
                'DOMAIN': JSON.stringify(process.env.DOMAIN),
            }
        })
    ],
};