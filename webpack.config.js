
//const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");


module.exports = {
    entry: './src/game.ts',
    devServer:{
    static: path.join(__dirname, "game"),
    compress: true,
    port: 4040,
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'game')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                configFile: path.resolve('./tsconfig.json'),
            }
        }]
    },
    devtool:'source-map',
    mode: "development",
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.resolve(__dirname, "src/game.html"), to: path.resolve(__dirname, "game/") },
            { from: path.resolve(__dirname, "src/assets/"), to: path.resolve(__dirname, "game/assets/") }
          ],
        }),
      ]
};