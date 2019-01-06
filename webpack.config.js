const { resolve } = require('path');

const JSMinimizer = require('uglifyjs-webpack-plugin');

const CONFIGURATION = {
    stats: {
        builtAt: false,
        cachedAssets: false,
        children: false,
        chunks: false,
        colors: true,
        depth: true,
        entrypoints: true,
        env: true,
        errors: true,
    },
    entry: resolve(__dirname, 'source/index.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules'],
    },
    optimization: {
        minimizer: [
            new JSMinimizer({
                parallel: true,
                exclude: ['node_modules'],
            }),
        ],
        noEmitOnErrors: true,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: resolve(__dirname, 'cache'),
                        },
                    },
                ],
                exclude: [resolve(__dirname, 'node_modules')],
            },
        ],
    },
};

module.exports = CONFIGURATION;
