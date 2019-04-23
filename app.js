/* jslint devel: true */
//const express = require('express')
//
//const socket = require('socket.io')
//
//const http = require('http')
//
//const fs = require('fs');
//
//const app = express()
//
//const server = http.createServer(app)
//
//const io = socket(server)
//
//
//app.use('/css', express.static('./static/css'))
//app.use('/js', express.static('./static/js'))
///*외부클라이언트가 /css, /js경로로 액세스 가능*/
//
//app.get('/', function(request, response) {
//    fs.readFile('./static/index.html', function(err, data) {
//        if(err) {
//            response.send('error')
//        } else {
//            response.writeHead(200, { 'Content-Type': 'text/html' })
//            response.write(data)
//            response.end()
//        }
//    })
//}) 
//
//io.sockets.on('connection', function(socket) {
//    /* 소켓에서 해당 이벤트를 받으면 콜백함수를 실행 (connection일때)*/
//    console.log('user login')
//    
//    socket.on('send', function(data) {
//        /* 이벤트를 받을 경우 호출 */
//        console.log('sended message: ', data.msg)
//    })
//    
//    socket.on('disconnect', function() {
//        /* 소켓과 접속이 끊어질 때 실행 */
//        console.log('log out')
//    })
//})
//
//server.listen(8080, function() {
//    console.log('server loading')
//})
//
///* require로 모듈 불러오기 */
///* listen메소드로 서버 시작하기 */
///* response.send로 데이터 보내기 */


const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

const fs = require('fs');

app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) {
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            response.end()
        }
    })
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(8080, () => {
    console.log('Connected at 8080');
});