const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name]-[contentHash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'cheap-source-map',
    module: {
        rules: [
            // Load SCSS into JS as CSS and inject style into seperated files
            {
                include: [ path.resolve(__dirname, './src/styles.scss') ],
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
            },
            // Load SCSS into JS as CSS
            {
                test: /\.scss$/,
                exclude: [
                    /(node_modules)/,
                    path.resolve(__dirname, './src/styles.scss'),
                ],
                use: [ 'css-loader', 'postcss-loader', 'sass-loader' ],
            },
            // Loader to use babel for new js features browser adoption
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: [ [ '@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: 3 } } ]] },
                },
            },
        ],
    },
    // Clean dist folder each time release to production
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name]-[contentHash].css' }),
        new CleanWebpackPlugin(),
    ],
});