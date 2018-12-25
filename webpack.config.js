const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'production',
    entry: {
        main: './index.js'
    },
    output: { //for building
        path: path.resolve(__dirname, './output'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: './',
        allowedHosts: ['127.0.0.1', 'localhost', '0.0.0.0'],
        publicPath: '/',
        historyApiFallback: true, 
        port: 8080,
        inline: true,
        public: '127.0.0.1'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: ['babel-loader']
            },
            {
                test: /\.styl$/i,
                include: path.resolve(__dirname, 'GLOBAL_CSS'),
                use: [
                    devMode? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{modules: false}
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.styl$/i,
                exclude: path.resolve(__dirname, 'GLOBAL_CSS'),
                use: [
                    devMode? 'style-loader' :MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                        
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: ['file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: false, // webpack@2.x and newer
                    },
                  }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: 'file-loader'
            }

        ]
    },
    // externals : {
    //     react: 'react',
    //     reactdom: 'react-dom'
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.js$/i
        })],
        splitChunks: {
            cacheGroups: {
                styles:{
                    name: 'styles',
                    test: /\.css$/i,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
}