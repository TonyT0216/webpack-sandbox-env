const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const paths = require('./configs/paths');

module.exports = merge(common, {
    mode: 'production',

    devtool: false,

    output: {
        filename: 'js/[name].[contenthash].js',
        path: paths.build,
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: false,
                            sourceMap: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...'],
        runtimeChunk: {
            name: 'runtime',
        },
    },

    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },

    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: 'styles/[name].[contenthash].css',
        }),
    ],

    
});