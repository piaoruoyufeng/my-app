const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((request, response, next) => {
	console.log('有人请求服务器了');
	console.log('请求来自于', request.get('Host'));
	console.log('请求的地址', request.url);
	next()
})

app.get('/login', (request, response) => {
	const params = request.query;
	const users = require('./users.json');
	let code;
	for (let i = 0; i < users.length; i++) {
		if (params.username === users[i].username) {
			if (params.password === users[i].password) {
				code = '1';
				break;
			}
			else {
				code = '2';
				break;
			}
		}
		else {
			code = '3';
		}
	}
	response.send(code);
})

app.get('/register', (request, response) => {
	const params = request.query;
	const fs = require('fs');
	const path = require('path');
	const users = require('./users.json');
	let code;
	for (let i = 0; i < users.length; i++) {
		if (params.username === users[i].username) {
			code = '3';
			break;
		}
		else {
			code = '1';
		}
	}
	if (code === '1') {
		let new_users = [];
		for (let i = 0; i < users.length; i++) {
			new_users.push(users[i]);
		}
		new_users.push(params);
		fs.readFile(path.join(__dirname, './users.json'), error => {
			if (error) { console.log(error) }
			fs.writeFile(path.join(__dirname, './users.json'), JSON.stringify(new_users), error => {
				if (error) { console.log(error) }
			})
		})
	}
	response.send(code);
})

app.get('/getVerificationcode', (request, response) => {
	const verificationcode = { verificationcode: Math.random().toFixed(6).slice(-6) }
	response.send(verificationcode)
})

app.post('/test', (request, response) => {
	console.log(request.body)
	response.send({ text: 'success' })
})

app.listen(5000, (err) => {
	if (!err) console.log('服务器启动成功了!');
})