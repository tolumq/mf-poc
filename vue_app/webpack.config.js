const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const deps = require('./package.json').dependencies;

const isProduction = process.env.NODE_ENV == "production";

const config = {
  mode: "development",
  cache: false,
  devtool: "source-map",
  optimization: {
    minimize: false,
    splitChunks: false
  },
  target: "web",
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: ['.vue', '.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [
            /\.vue$/
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader'
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'layout',
      remotes: {
        home: 'home@http://localhost:8081/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html'), chunks: ['main'] }),
    new VueLoaderPlugin(),
    // new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
        directory: path.join(__dirname),
    },
    compress: true,
    port: "8080",
    hot: true,
    open: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
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
