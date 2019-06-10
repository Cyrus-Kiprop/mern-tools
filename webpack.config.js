
const path = require('path');
//const webpack = require('webpack')

const config = {
    mode: 'production',
    entry: './src/App.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/
        }]
    },
};
module.exports = config;