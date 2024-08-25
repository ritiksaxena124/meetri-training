const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    plugins: [
        new ReactRefreshWebpackPlugin()
    ],
    devServer: {
        hot: true,
        open: true
    }
}