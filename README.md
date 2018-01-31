# 纯手工构建webpack + react 开发环境
---

## 新建文件，安装包，来个最简单的栗子

```
npm i webpack react
```
![](https://i.imgur.com/13f3MwH.png)

>build 文件夹放置webpack配置
>client 文件夹放置入口文件和客户端文件

在build文件夹中新建一个webpack.config.js

```javascript
var path = require('path');
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
	}
}

```

在package.js中
```
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   // 执行 npm run build 则可以进行打包
   "build": "webpack --config build/webpack.config.js"
 }
```
到此就可以运行`npm run build`进行最简单的打包了！