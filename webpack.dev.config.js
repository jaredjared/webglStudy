const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, 'src/index'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        // publicPath: 'https://cdn.example.com/assets/'
    },
    module: {
        rules: [
            {
                test: /\.js&/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '127.0.0.1'
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            vr: path.join(__dirname, 'src/vr'),
            router: path.join(__dirname, 'src/router')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
    ]
};