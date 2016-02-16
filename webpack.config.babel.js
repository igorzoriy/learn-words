/* eslint-env node */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'

export default {
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    context: `${__dirname}/src`,
    entry: {
        bundle: './index.js',
        styles: `./styles.css`,
        publicPath: '/',
    },
    output: {
        path: `${__dirname}/tmp`,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap', 'postcss-loader']),
            },
        ],
    },
    postcss: (webpack) => {
        return [
            postcssImport({
                addDependencyTo: webpack,
            }),
            autoprefixer({
                browsers: ['Android >= 4, iOS >= 7'],
            }),
        ]
    },
    devServer: {
        contentBase: `${__dirname}/app`,
        port: 8888,
    },
}
