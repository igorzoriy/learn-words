/* eslint-env node */
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let devMode = process.env.NODE_ENV === 'development'

let plugins = [
    new ExtractTextPlugin('[name].css'),
]
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        })
    )
}

export default {
    plugins,
    devtool: devMode ? 'inline-source-map' : '',
    context: __dirname,
    entry: {
        bundle: './src/index.js',
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
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
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
                }),
            },
        ],
    },
    devServer: {
        contentBase: `${__dirname}/public`,
        port: 8888,
        historyApiFallback: true,
    },
}
