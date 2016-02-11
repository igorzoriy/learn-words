/* eslint-env node */

export default {
    context: `${__dirname}/src`,
    entry: './index.js',
    output: {
        path: `${__dirname}/tmp`,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/,
            },
        ],
    },
    devServer: {
        contentBase: `${__dirname}/app`,
        port: 8888,
    },
}
