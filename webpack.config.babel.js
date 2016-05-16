/* eslint-env node */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'

export default {
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    devtool: 'inline-source-map',
    context: __dirname,
    entry: {
        bundle: './src/index.js',
        styles: `./styles/styles.scss`,
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
        contentBase: `${__dirname}/app`,
        port: 8888,
        historyApiFallback: true,
    },
}
