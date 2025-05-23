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
                remote: 'remote@https://d2rlgquuf6ymrx.cloudfront.net/remote/remoteEntry.js',
                products: 'products@https://d2rlgquuf6ymrx.cloudfront.net/products/remoteEntry.js'
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
                PUBLIC_URL: 'https://d2rlgquuf6ymrx.cloudfront.net/host'
            }
        })
    ]
};