const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

const config = {
    mode: isDev ? 'development' : 'production',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules|\.d\.ts$/,
            },
            {
                test: /\.mjs$/,
                loader: 'esbuild-loader',
                include: /node_modules/,
                exclude: /\.d\.ts$/,
                options: {
                  target: 'es6', // or specify your target environment
                },
              },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "template" }
            ],
        }),
    ],
    devServer: {
        static:{
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 8080,
        hot: true
    },
    optimization: {
        minimize: !isDev
      }
};

module.exports = config;