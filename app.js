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


//const app = require('express')();
//
//const server = require('http').Server(app);
//
//const io = require('socket.io')(server);
//
//const fs = require('fs');
//
////io.on('connection', (socket) => {
////    console.log('a user connected');
////    
////    socket.on('chat message', (msg) => {
////        io.emit('chat message', msg);
////    });
////    socket.on('disconnect', () => {
////        console.log('user disconnected');
////    });
////});
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
//});
//server.listen(8080, () => {
//    console.log('Connected at 8080');
//});
//
//const namespace1 = io.of('/namespace1');
//
//namespace1.on('connection', (socket) => {
//    namespace1.emit('new', {hello: "someone connected at namespace1"});
//});
//
//const namespace2 = io.of('/namespace2');
//
//namespace2.on('connection', (socket) => {
//    namespace2.emit('new', {hello: "someone connected at namespace2"});
//});
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () => {
  console.log('connect 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// NameSpace 1번
const namespace1 = io.of('/namespace1');

// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
namespace1.on('connection', (socket) => {
  namespace1.emit('news', { hello: "Someone connected at namespace1" });
});

// NameSpace 2번
const namespace2= io.of('/namespace2');

// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
namespace1.on('connection', (socket) => {
  namespace1.emit('news', { hello: "Someone connected at namespace2" });
});