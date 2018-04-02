# pk-intelligence

> A Vue.js project
答题应用－持续更新中

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# start a server and visit http://localhost:3000/ to run this app
npm run start
```

### 初始化
1. 使用 vue-cli 初始化一个带有 webpack 默认配置的前端项目
｀vue init webpack ｀

2. template 文件目录
-- components
--- modal               // 提示框
---- modal.vue
--- homePage.vue        // 游戏首页模板
--- recuritPage.vue     // 答题模板
--- pkResult.vue        // 成绩模板

### 实现
#### 使用 vue-router 控制 App.vue 内 template 模板的变化
- 路由跳转实现模板间参数传递
```
this.$router.push({
    name: 'pkResult', 
    params: {scores: this.scores, passNo: this.passNo}
})
```
#### 提示框显示后自动消失功能
- 通过 v-if="modalText" 控制 modal 显示与隐藏
- setTimeout 控制一定时间间隔后掉用 hideModal() 方法

这里有一点要注意，虽然已经把 modalText 加入到 data 模型了，但是在同一个 method 中更改 modalText 的值并不会触发页面重新update，只有触发 method 中的方法 Vue 才会 重新 update。(我也有用到 vm$forceUpdate() 方法,modal里也用了slot可还是不更新:-()

```
calulateScore(tips, event) {
    event.stopPropagation()
    var that = this
    ...
    if(this.chooseId != this.questions[this.curQuestionNo].answer){
        let anw =  String.fromCharCode(this.questions[this.curQuestionNo].answer+'A'.charCodeAt())
        this.modalText = "回答错误，正确答案为"+anw            
    }
    setTimeout(function(){
        that.hideModal()
        that.nextQuestion(tips)
    }, 1000, tips)
},
hideModal() {
    this.modalText = ""
}
```

#### 数据请求
向后台请求 `/questions` Vue 2.5.2 已经不支持`this.$http`，调试器打印出来为undefined，使用 axios 请求数据。

### server 端
express 构建的基础服务
- [superagent](http://visionmedia.github.io/superagent/): 适用于nodejs环境的客户端请求代理模块，用于模拟请求数据
- [cheerio](https://github.com/cheeriojs/cheerio): 实现了部分 JQuery 功能，用于后端解析 html 页面
- [async](https://caolan.github.io/async/): 简单的异步请求模块

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
