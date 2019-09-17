const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const fs = require('fs');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        index: ['webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server', './src/js/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets')
    },
    mode: 'development',
    devtool: isDevelopment && "inline-source-map",
    devServer: {
        port: 3000,
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        clientLogLevel: 'info',
        historyApiFallback: true,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src/js'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    isDevelopment ?
                        'style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: true,
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 2 versions"]
                            },
                            sourceMap: isDevelopment,
                            plugins: () => [
                                autoprefixer
                            ]
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {test: /\.handlebars$/, loader: "handlebars-loader"}
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CopyWebpackPlugin([
            {
                from: './src/static/fonts',
                to: './fonts'
            },
            {
                from: './src/static/img',
                to: './img'
            }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/tpls/index.handlebars'),
            filename: path.join(__dirname, 'dist/index.html'),
            chunks: 'index.handlebars',
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            },
        })
    ]
};
