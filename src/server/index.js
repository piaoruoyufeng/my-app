const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((request, response, next) => {
	console.log('有人请求服务器了');
	console.log('请求来自于', request.get('Host'));
	console.log('请求的地址', request.url);
	next()
})

app.get('/login', (request, response) => {
	const users = require('./users.json');
	response.send(users)
})

app.get('/register', (request, response) => {
	let params = request.query
	console.log(params)
	response.send(params)
})

app.get('/getVerificationcode', (request, response) => {
	const verificationcode = { verificationcode: Math.random().toFixed(6).slice(-6) }
	response.send(verificationcode)
})

app.listen(5000, (err) => {
	if (!err) console.log('服务器启动成功了!');
})