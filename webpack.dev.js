const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            // Load SCSS into JS as CSS and inject style into the DOM
            {
                include: [ path.resolve(__dirname, './src/styles.scss') ],
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            },
            // Load SCSS into JS as CSS
            {
                test: /\.scss$/,
                exclude: [
                    /(node_modules)/,
                    path.resolve(__dirname, './src/styles.scss'),
                ],
                use: [ 'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        prependData: '@import "src/styles.scss";',
                    },
                } ],
            },
        ],
    },
    devServer: {
        port: 4400,
        contentBase: '/',
        stats: 'errors-only',
        // stats: {
        //     colors: true,
        //     hash: false,
        //     version: false,
        //     timings: false,
        //     assets: false,
        //     chunks: false,
        //     modules: false,
        //     reasons: false,
        //     children: false,
        //     source: false,
        //     errors: true,
        //     errorDetails: false,
        //     warnings: true,
        //     publicPath: false
        // },
    },
});