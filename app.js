/* jslint devel: true */
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const app = express()

const server = http.createServer(app)

const io = socket(server)


app.get('/', function(request, response) {
    console.log('user login')
    response.send('Hello Express Server')
}) 

server.listen(8080, function() {
    console.log('server loading')
})

/* require로 모듈 불러오기 */
/* listen메소드로 서버 시작하기 */
/* response.send로 데이터 보내기 */