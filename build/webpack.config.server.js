const path = require('path');
module.exports = {
  target: "node", // 打包出来的内容，在什么环境内执行
  // 声明入口
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  // 打包输出
  output: {
    // 服务器端不存在缓存，所有没必要使用[name][hash]
    filename: 'server-entry.js', // 输出文件的名称
    path: path.join(__dirname, '../dist'), // 输出路径
    publicPath: '',
    /**
     * 最直观的体现，如果publicPath: '',
     * 则在最后打包生成的html中：
     * <script src = 'app.hash.js'></script>
     * 反之：
     * <script src = '/public/app.hash.js'></script>
     * 帮我们区分是静态资源还是api请求，或者其他需要特殊处理的请求
     */
    libraryTarget: "commonjs2" // 模块打包加载方案
  },
  module: {
    rules: [
      {
        test: /.jsx$/, // 所有jsx结尾的文件，用babel-loader解析
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        // node_modules下面的js代码都不需要编译
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
