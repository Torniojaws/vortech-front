let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'src');
let APP_DIR = path.resolve(__dirname, 'src');

let config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: APP_DIR,
        port: 8100,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff)$/,
                loader: 'file-loader'
            }
        ]
    }
};

module.exports = config;
