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
在client文件夹中新建一个app.js和App.jsx

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

## React 登场
安装react-dom
```
npm i react-dom
```

App.jsx
```
import React from 'react';

export default class App extends React.Component {
	render() {
		return (
			<div>this is app</div>	
		)
	}
}
```

app.js
``` javascript
/**
 * 应用入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App/>,document.body); // 不推荐这种直接挂在body上，最好是有一个节点
```

要编译jsx文件则需要在webpack.config.js中配置loader
```
var path = require('path');
module.exports = {
	// 声明入口
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	// 打包输出
	output: {
		.....
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
```

安装babel-loader包
```
npm i babel-loader -D // 只在生产环境中用
```

`babel-loader`也只是一个插件，要使用`babel-loader`还需要babel源码

```
npm i babel-core -D
```

到此，以为就完了吗
babel默认编译的是es6的代码，要想让它支持jsx，还得配置`.babelrc`文件
.babelrc
```JavaScript
{
  "presets": [
    ["es2015", { "loose": true }], // 当前文件的语法
    "react"
  ]
}
```
>这里附上vue-cli生成的`.babelrc`作对比
```
{
    // 此项指明，转码的规则
    "presets": [
        // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
        ["env", {
          "modules": false,
          "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }],
        // 下面这个是不同阶段出现的es语法，包含不同的转码插件
        "stage-2"
    ],
    // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
    // 下面指的是在生成的文件中，不产生注释
    "comments": false,
    // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
    "env": {
        // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
        "test": {
            "presets": ["env", "stage-2"],
            // instanbul是一个用来测试转码后代码的工具
            "plugins": ["istanbul"]
        }
    }
}
```

然后还得安装一堆包
```
npm i babel-preset-es2015 babel-preset-es2015-loose babel-preset-react -D
```

然后执行`npm run build`就可以编译jsx了
![](https://i.imgur.com/MNZrn9H.png)

## html-webpack-plugin

`npm i html-webpack-plugin`

```
plugins: [
   /**
	 * 打包的时候生成一个html页面，同时将所有的entry都注入到里面
     */
	new HTMLPlugin()
]
```

![](https://i.imgur.com/poCEB7F.png)