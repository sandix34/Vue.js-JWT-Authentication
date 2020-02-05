module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: "http://localhost:3000"
  },
  outputDir: "../client-build"
};