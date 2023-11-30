const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const isProduction = process.env.NODE_ENV == "production";

const styleHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : "style-loader";

const config = {
    entry: "./src/index",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        open: true,
        // host: "localhost",
        hot: true,
        port: "8081",
    },
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    styleHandler,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    styleHandler,
                    { loader: "css-loader", options: { modules: true } },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(svg|png|ttf|woff2|eot|jpg|gif)$/i,
                type: "asset",
            },
        ],
    },
    cache: false,
    devtool: "source-map",
    target: "web",
    optimization: {
        minimize: false,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "home",
            filename: "remoteEntry.js",
            library: {type: "var", name: "home"},
            exposes: {
                "./Button": "./src/main/atoms/Button/Button.tsx",
                "./Icon": "./src/main/atoms/Icon/Icon.tsx",
                "./Input": "./src/main/atoms/Input/Input.tsx",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({ template: "index.html" }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
        alias: {},
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = "development";
    }
    return config;
};
