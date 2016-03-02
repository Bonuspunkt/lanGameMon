module.exports = {
    entry: './wwwScript/index.js',
    output: {
        filename: 'wwwRoot/script.js'
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
            loader: 'style-loader!css-loader!stylus-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};