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
	const params = request.query;
	const fs = require('fs');
	const path = require('path');
	fs.readFile(path.join(__dirname, './users.json'), error => {
		const users = require('./users.json');
		response.send(users);
		let new_users = [];
		for (let i = 0; i < users.length; i++) {
			new_users.push(users[i]);
		}
		let isExist = false;
		for (let j = 0; j < users.length;) {
			if (params.username !== users[j].username) {
				j++;
			} else {
				isExist = true;
				break;
			}
		}
		if (!isExist) {
			new_users.push(params);
		}
		if (error) { console.log(error) }
		fs.writeFile(path.join(__dirname, './users.json'), JSON.stringify(new_users), error => {
			if (error) { console.log(error) }
		})
	})
})

app.get('/getVerificationcode', (request, response) => {
	const verificationcode = { verificationcode: Math.random().toFixed(6).slice(-6) }
	response.send(verificationcode)
})

app.listen(5000, (err) => {
	if (!err) console.log('服务器启动成功了!');
})