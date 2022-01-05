const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./configs/paths');

module.exports = {
    entry: [paths.src + '/index.js'],

    output: {
        filename: '[name].bundle.js',
        path: paths.build,
        publicPath: '/'
    },

    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'] }
        ]
    },

    optimization: {
        usedExports: true
    },
    
    plugins: [

        new BundleAnalyzerPlugin(),

        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
        }),

    ],

    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': paths.src,
            assets: paths.public,
        }
    },
}