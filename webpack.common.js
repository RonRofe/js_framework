const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/app/modules/index.module.js',
    },
    module: {
        rules: [
            // Load images, svgs, etc. correctly from the dist in html files + minimazation
            {
                test: /\.html$/,
                exclude: /(node_modules)/,
                use: [ 'html-loader' ],
            },
            // Transfer all assets files to the dist folder
            {
                test: /\/src\/assets\/.{0,}$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: (url, resourcePath, context) => {
                            const relativePath = path.relative(context, resourcePath);
                            const relativeToAssets = relativePath.replace(/^src\/assets\//g, '');

                            return `assets/${relativeToAssets}/${url}`;
                        },
                    },
                },
            },
        ],
    },
    // Transfer HTML files to the dist folder + and automatically use JS imports
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: [ 'index' ],
        }),
        // ... More pages
    ],
};