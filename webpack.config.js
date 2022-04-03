const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    mode: process.env.NODE_ENV,
    devtool: devMode ? "source-map" : false,
    context: __dirname,
    entry: {
        bundle: "./src/index.tsx",
        styles: `./styles/styles.scss`,
    },
    output: {
        path: `${__dirname}/public`,
        filename: "[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["awesome-typescript-loader"],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devServer: {
        static: `${__dirname}/public`,
        port: 8888,
        historyApiFallback: true,
    },
};
