var path = require("path");
const webpack = require("webpack");
var buildPath = path.resolve("src");

module.exports = (env) => ({
  mode: env && env.prod ? "production" : "development",

  plugins: [
    new webpack.ProvidePlugin({
      BOX: "box",
      loader: "loader",
    }),
  ],

  entry: ["./src/game.js"],
  output: {
    path: buildPath,
    filename: "game.js",
  },

  resolve: {
    alias: {
      "@babylonjs": path.resolve("node_modules/@babylonjs"),
      box: path.resolve(__dirname, "core/box"),
      loader: path.resolve(__dirname, "core/loader"),
    },
  },

  performance: {
    // change the default size warnings
    maxEntrypointSize: 1.5e6,
    maxAssetSize: 1.5e6,
  },

  stats: {
    modules: false,
  },
  devtool: "source-map",
  devServer: {
    contentBase: buildPath,
    inline: true,
    host: "127.0.0.1",
    stats: "minimal",
  },
  // optimising build CPU and DEV server
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: ["node_modules"],
  },
  // split out babylon to a separate bundle
  optimization: {
    splitChunks: {
      cacheGroups: {
        babylon: {
          chunks: "initial",
          test: /babylonjs/,
          filename: "babylon.js",
        },
      },
    },
  },
});
