const webpack = require('webpack');
const webpackConfig = require('./webpack.config')

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
);

module.exports = webpackConfig;