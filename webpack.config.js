const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    mode: process.env.NODE_ENV,
    devtool: devMode ? 'source-map' : '',
    context: __dirname,
    entry: {
        bundle: './src/index.tsx',
        styles: `./styles/styles.scss`,
    },
    output: {
        path: `${__dirname}/public`,
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: devMode,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: devMode,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: devMode,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            })
        ],
    },
    devServer: {
        contentBase: `${__dirname}/public`,
        host: '0.0.0.0',
        port: 8888,
        historyApiFallback: true,
    },
}
