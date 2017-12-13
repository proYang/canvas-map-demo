const webpack = require('webpack')
const path = require('path')

const config = {
    entry: './src/index.js',
    output: {
        filename: `bundle.js`,
        path: path.resolve(__dirname, 'dist'),
        library: `bundle`,
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }]
    },
    devtool: 'inline-source-map',
    plugins: [],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        port: 9000,
        index: 'index.html',
        open: true
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}

module.exports = config