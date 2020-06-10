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
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            },
        ],
    },
    devServer: {
        port: 4400,
        contentBase: '/',
    },
});