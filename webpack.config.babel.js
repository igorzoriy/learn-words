/* eslint-env node */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import LessAutoprefixer from 'less-plugin-autoprefix'

export default {
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    devtool: 'inline-source-map',
    context: __dirname,
    entry: {
        bundle: './src/index.js',
        styles: `./styles/styles.less`,
    },
    output: {
        path: `${__dirname}/tmp`,
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
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap', 'less-loader?sourceMap']),
            },
        ],
    },
    lessLoader: {
        lessPlugins: [
            new LessAutoprefixer({
                browsers: ['Android >= 4, iOS >= 7'],
            }),
        ],
    },
    devServer: {
        contentBase: `${__dirname}/app`,
        port: 8888,
        historyApiFallback: true,
    },
}
