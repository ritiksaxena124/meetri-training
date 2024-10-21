const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    mode: "development",
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    plugins:[
        new ReactRefreshPlugin()
    ]
}