// webpack.config.js
var path = require("path");

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app/app.js')],
    output: {
        path: path.join(__dirname, 'dist'),  //打包输出的路径
        filename: 'bundle.js',              //打包后的名字
        publicPath: "./dist/"              //在服务器中资源的路径
    }
};