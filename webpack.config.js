var path = require("path");
const webpack = require("webpack");
var distPath = path.resolve("dist");
var devPath = path.resolve("src");

module.exports = (env) => ({
  mode: env && env.prod ? "production" : "development",

  resolve: {
    alias: {
      "@babylonjs": path.resolve("node_modules/@babylonjs"),
      engine: path.resolve(__dirname, "core/engine"),
      loader: path.resolve(__dirname, "core/loader"),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      Engine: "engine",
      loader: "loader",
    }),
  ],

  entry: ["./src/client.js"],
  output: {
    path: distPath,
    filename: "bundle.js",
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
    contentBase: devPath,
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
