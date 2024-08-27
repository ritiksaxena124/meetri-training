const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname, "..", 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "..", "dist"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(jpeg|jpg|png|svg|gif)$/,
                type: "asset/resource"
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "src/index.html")
        }),
        new ReactRefreshPlugin()
    ],
};