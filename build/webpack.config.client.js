const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
module.exports = {
	// 声明入口
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	// 打包输出
	output: {
		// [name]对应的是entry里的名称，本例就是app
		// [hash]根据打包内容而生成的一个hash值，如果依赖的文件有改变，则hash改变
		filename: '[name].[hash].js', // 输出文件的名称
		path: path.join(__dirname, '../dist'), // 输出路径
		publicPath: '/public'
		/**
		 * 最直观的体现，如果publicPath: '',
		 * 则在最后打包生成的html中：
		 * <script src = 'app.hash.js'></script>
		 * 反之：
		 * <script src = '/public/app.hash.js'></script>
		 * 帮我们区分是静态资源还是api请求，或者其他需要特殊处理的请求
		 */
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
  },
	plugins: [
    /**
		 * 打包的时候生成一个html页面，同时将所有的entry都注入到里面
     */
		new HTMLPlugin({
			template: path.join(__dirname,'../client/template.html')
		})
	]
}
