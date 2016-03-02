const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './wwwScript/index.js',
    output: {
        filename: './wwwRoot/script.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        }]
    },
    plugins: [
        new ExtractTextPlugin('wwwRoot/stylesheet.css', {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};