const path = require("path");
const webpack = require("webpack");


const webpack_rules = [];
const webpackOption = {
    entry: "./src/js/index.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "public", "js"),
        filename: "bundle.js",
    },
    module: {
        rules: webpack_rules
    }
};
let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};
webpack_rules.push(babelLoader);
module.exports = webpackOption;