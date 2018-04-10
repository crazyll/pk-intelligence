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
1. 向后台请求 `/questions` Vue 2.5.2 已经不支持`this.$http`，调试器打印出来为undefined，使用 axios 请求数据。
2. 请求失败时加载 static 目录下的 questions.json 文件初始化题目数据

#### 错误监控
监控前端报错并发送到服务器
前端 log.js 文件：
```
export function logError(sev, msg){
    var img = new Image();
    img.src = '/logerrors?sev='+encodeURIComponent(sev)
    +'&msg='+encodeURIComponent(msg);
}
```
服务端接收到 /logerrors 将错误保存在本地服务器：
```
// 收集前端log
app.get('/logerrors', function(req, res){
	let message = new Date() + ":\n" + req.query.sev+':  '+req.query.msg+'\n';
	fs.appendFile(path.join(__dirname, '../log/log-'+getDay()), message+'\n', (err)=>{
		console.log('appendFile error happened.');
	})
})
```

监控 recuritPage.vue 中的错误：
```
import logError from '../utils/log.js'

initData() {
    axios.get('/questions')
    .then((response) => {
        this.questions = response.data
    })
    .catch((error) => {
        console.log(error);//输出错误日志到控制台
        logError('ERR',error);//上传错误日志到服务端
        this.getLocalData();
    });
}
```

#### 使用localStory初始化成绩信息
File homePage.vue
使用created钩子函数调用initData()方法：
```
created(){
    this.$nextTick(function(){
        this.initData()
    })   
},
```
initData() 当读到上一次成绩为默认值0时，拿localStorage中的数据去初始化：
```
methods: {
    initData(){
        if(this.$store.state.personal.lastPerf.score === 0){
            if(localStorage.getItem('personal')){
                let str = localStorage.getItem('personal')
                let personal = JSON.parse(str)
                let state2 = {
                    user: personal.user,
                    lastPerf: personal.lastPerf,
                    sum: personal.sum,
                    rightNo: personal.rightNo
                }                
                this.$store.commit('initPersonal', state2)  
            }                                          
        } else {
            if(this.$store.state.personal.user != this.user.userName){
                console.log("清除缓存")
                localStorage.clear()
            }                
        }
    }
}
```


### server 端
express 构建的基础服务
File ／server/app.js
- [superagent](http://visionmedia.github.io/superagent/): 适用于nodejs环境的客户端请求代理模块，用于模拟请求数据
- [cheerio](https://github.com/cheeriojs/cheerio): 实现了部分 JQuery 功能，用于后端解析 html 页面
- [async](https://caolan.github.io/async/): 简单的异步请求模块

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
