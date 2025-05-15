const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require("path");
module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                remote: 'remote@http://localhost:3001/remoteEntry.js',
                products: 'products@http://localhost:3002/remoteEntry.js',
                filter: 'products@http://localhost:3002/remoteEntry.js'
            },
            shared: {
                react: { singleton: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, requiredVersion: '^17.0.2' }
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/manifest.json', to: 'manifest.json' }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                PUBLIC_URL: 'http://localhost:3000'
            }
        })
    ]
};