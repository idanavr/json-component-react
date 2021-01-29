const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const demoFolder = path.join(__dirname, '..', 'demo');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        path.join(demoFolder, 'src/index.js')
    ],
    mode: 'development',
    output: {
        path: path.join(demoFolder),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        overlay: true,
        hot: true,
        historyApiFallback: true,
        port: 8080
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(demoFolder, 'src/index.html'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules:
            [{
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                exclude: /node_modules/,
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(s?css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|ico|ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader'
            }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts']
    }
};