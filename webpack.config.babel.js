/* eslint-env node */
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'


let plugins = [
    new ExtractTextPlugin('[name].css'),
]
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        })
    )
}

export default {
    plugins,
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : '',
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
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', [
                    'css-loader?sourceMap',
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap',
                ]),
            },
        ],
    },
    postcss: () => {
        return [autoprefixer({
            browsers: ['Android >= 4, iOS >= 7'],
        })]
    },
    devServer: {
        contentBase: `${__dirname}/public`,
        port: 8888,
        historyApiFallback: true,
    },
}
