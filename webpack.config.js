
const path = require('path');
//const webpack = require('webpack')

const config = {
    // this is a preprocessor that maps bundled code into its initial sourced code and other minified files
    devtool: 'source-map',
    mode: 'development',
    // to accept HMR middlewares entry points will be tweaked to be an array or object
    entry: {
        app: ['./src/App.jsx']
    },
    output: {
        path: path.resolve(__dirname + 'static'),
        filename: 'app.bundle.js'
    },
    // this plugin is for HMR middlewares
    plugins: [],
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/
        }]
    },
    // this one handle the webpark-dev-server port to apis
    devServer: {
        port: 8080,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001'
            }
        }
    }
};
module.exports = config;