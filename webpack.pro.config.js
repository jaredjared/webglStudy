const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const proData=require('./deploy/config');
const proName=proData.procname;
module.exports = {
    entry: {
        main: path.join(__dirname, 'src/index'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: `https://mat1.gtimg.com/yslp/yyh5/${proName}/`
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
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            filename: `${proName}.html`,
            template: path.join(__dirname, 'src/index.html')
        }),
        new HtmlWebpackPlugin({
            filename: `${proName}_test.html`,
            template: path.join(__dirname, 'src/index.html')
        }),
        
    ]
};