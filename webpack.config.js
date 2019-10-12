/*** webpack.config.js ***/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});
const tsImportPlugin = require("ts-import-plugin");
module.exports = {
  entry: path.join(__dirname, "examples/src/index.tsx"),
  devtool: "source-map",
  module: {
    rules: [
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
              getCustomTransformers: () =>({
                before: [tsImportPlugin({
                  libraryDirectory: 'es',
                  libraryName: 'antd',
                  style: 'css'
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  },
  devServer: {
    port: 3001
  }
};
