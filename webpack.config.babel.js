/* eslint-env node */

export default {
    context: `${__dirname}/app/scripts`,
    entry: './init.js',
    output: {
        path: `${__dirname}/tmp`,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
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
