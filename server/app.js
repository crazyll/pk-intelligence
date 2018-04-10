const express = require('express') 
const superagent = require('superagent') 
const cheerio = require('cheerio') 
const async = require('async') 
require('superagent-charset')(superagent)

var path = require('path') 
const fs = require('fs') 

const app = express() 

const baseUrl = "https://www.nowcoder.com"
let id = 0 //计数器

var fetchQuestion = function(url, callback, id){
	superagent
	.get(baseUrl+url)
	// .charset('utf8')
	.end(function(err, qres) {
		if (err) {
	    return next(err) 
	  }
   let $ = cheerio.load(qres.text) 
   
   let title = $('meta[name=description]').attr('content')

   let ary = []
   $('.subject-des-list li pre').each(function (idx, element) {
	    var $element = $(element) 
	    ary.push($element.text())
	  }) 

		let sub = {
	   	id: id,
	   	subject: title,
			options: ary,
			answer: ary.length-1
	   }
		callback(null, sub)
   })		  
}

//爬虫程序
app.get('/questions', function(req, res, next){
	let ret = ""
	var itemList = [] 
	let i = Math.random()
	i = ((i*10)%10).toFixed(0)
	// 首先获取题目的地址
  superagent.get(baseUrl+'/questionCenter?orderByHotValue=1&questionTypes=100000&onlyReference=false&page='+i)
	.end(function (err, sres) {
	  // 常规的错误处理
	  if (err) {
	    return next(err) 
	  }

	  var $ = cheerio.load(sres.text) 
	  var items = [] 
	  $('.end-quot a').each(function (idx, element) {
	  	if(idx>=10){return}//只爬十个题目
	    var $element = $(element) 

	    items.push({
	      title: $element.text().trim(),
	      href: $element.attr('href')
	    }) 
	  }) 

		// 根据地址异步获取题目内容
	  async.mapLimit(items, 10, function (url, callback) {
      id++
      fetchQuestion(url.href, callback, id)
    }, function (err, results) {
			fs.appendFile("./questions.json", JSON.stringify(results), function(err){
				if (err) throw err 
				console.log('The "data to append" was appended to file!') 
			})
			if(err) next()
      res.send(results)
    })
	}) 
})


// view engine setup
var ejs = require('ejs')
app.engine('html', ejs.__express) 
app.set('view engine', 'html') 
app.set('views', path.join(__dirname, '../dist')) 

app.use(express.static(path.join(__dirname, '../dist'))) 


app.get('/', function(req, res, next){
	res.render('index')
}) 


// 收集前端log
app.get('/logerrors', function(req, res){
	let message = new Date() + ":\n" + req.query.sev+':  '+req.query.msg+'\n';
	fs.appendFile(path.join(__dirname, '../log/log-'+getDay()), message+'\n', (err)=>{
		console.log('appendFile error happened.');
	})
})

function getDay(){
	let today = '';
	let date = new Date();
	today += date.getFullYear()+'-';
	today += (date.getMonth()+1)+'-';
	today += date.getDate();
	return today;
}

//监听本地的 3000 端口
app.listen(3000, function () {
  console.log('app is listening at port 3000') 
}) 