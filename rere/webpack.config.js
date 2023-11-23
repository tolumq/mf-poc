const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const isProduction = process.env.NODE_ENV == "production";

const styleHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : "style-loader";

const config = {
    entry: "./src/index",
    target: "web",
    output: {
        // path: path.resolve(__dirname, "dist"),
        publicPath: "auto",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        open: true,
        host: "localhost",
        hot: true,
        port: "8081",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "rere",
            filename: "remoteEntry.js",
            library: {type: "var", name: "rere"},
            exposes: {
                "./Button": "./src/main/Button.tsx",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                    // eager: true,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                    // eager: true,
                },
            },
        }),
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
    // optimization: {
    //     runtimeChunk: "single",
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendors",
    //                 chunks: "all",
    //             },
    //         },
    //     },
    // },
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
