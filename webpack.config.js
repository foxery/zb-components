const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const tsImportPlugin = require("ts-import-plugin");

module.exports = {
  entry: "./src/app.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPlugin({
                    libraryDirectory: "es",
                    libraryName: "antd",
                    style: "css"
                  })
                ]
              }),
              compilerOptions: {
                module: "es2015"
              }
            }
          }
        ]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
      // {
      //   test: /\.(js|vue|ts|tsx|jsx)$/,
      //   enforce: "pre",
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {
      //     fix: false,
      //     extensions: [".js", ".jsx", ".vue", ".ts", ".tsx"],
      //     cache: false,
      //     emitWarning: true,
      //     emitError: false
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
};
