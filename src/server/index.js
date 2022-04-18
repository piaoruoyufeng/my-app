const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('有人请求服务器1了');
	console.log('请求来自于',request.get('Host'));
	console.log('请求的地址',request.url);
	next()
})

app.get('/login',(request,response)=>{
    const users = require('./users.json');
	response.send(users)
})

app.get('/register',(request,response)=>{
    const users = require('./users.json');
	response.send(users)
})

app.listen(5000,(err)=>{
	if(!err) console.log('服务器1启动成功了!');
})