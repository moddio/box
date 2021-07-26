var path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
var buildPath = path.resolve("src");

module.exports = (env) => ({
  mode: env && env.prod ? "production" : "development",

  entry: "./src/client.js",
  output: {
    path: buildPath,
    filename: "client.js",
  },

  resolve: {
    alias: {
      "@babylonjs": path.resolve("node_modules/@babylonjs"),
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
