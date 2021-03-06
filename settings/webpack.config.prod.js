const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const rootFolder = path.join(__dirname, '..');

module.exports = {
    entry: [
        './src/index.js'
    ],
    mode: 'production',
    performance: {
        hints: false
    },
    output: {
        path: path.join(rootFolder, 'dist'),
        publicPath: './',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    optimization: {
        minimize: true
    },
    module: {
        rules:
            [{
                exclude: /node_modules/,
                test: /\.js$/,
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
                test: /\.(png||jpg||ico||ttf||eot||woff||woff2||svg)$/,
                loader: 'url-loader'
            }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts']
    },
    externals: {
        'react': 'commonjs react',
        'react-dom': 'commonjs react-dom',
    },
};