/* jslint devel: true */
////const express = require('express')
////
////const socket = require('socket.io')
////
////const http = require('http')
////
////const fs = require('fs');
////
////const app = express()
////
////const server = http.createServer(app)
////
////const io = socket(server)
////
////
////app.use('/css', express.static('./static/css'))
////app.use('/js', express.static('./static/js'))
/////*외부클라이언트가 /css, /js경로로 액세스 가능*/
////
////app.get('/', function(request, response) {
////    fs.readFile('./static/index.html', function(err, data) {
////        if(err) {
////            response.send('error')
////        } else {
////            response.writeHead(200, { 'Content-Type': 'text/html' })
////            response.write(data)
////            response.end()
////        }
////    })
////}) 
////
////io.sockets.on('connection', function(socket) {
////    /* 소켓에서 해당 이벤트를 받으면 콜백함수를 실행 (connection일때)*/
////    console.log('user login')
////    
////    socket.on('send', function(data) {
////        /* 이벤트를 받을 경우 호출 */
////        console.log('sended message: ', data.msg)
////    })
////    
////    socket.on('disconnect', function() {
////        /* 소켓과 접속이 끊어질 때 실행 */
////        console.log('log out')
////    })
////})
////
////server.listen(8080, function() {
////    console.log('server loading')
////})
////
/////* require로 모듈 불러오기 */
/////* listen메소드로 서버 시작하기 */
/////* response.send로 데이터 보내기 */
//
//////namespace안에 room 두 개 설정하기
////const app = require('express')();
////const http = require('http').Server(app);
////const io = require('socket.io')(server);
////
////server.listen(3000, () => {
////  console.log('connect 3000');
////});
////
////app.get('/', (req, res) => {
////  res.sendFile(__dirname + '/static/index.html');
////});
////
////// NameSpace 1번
////const namespace1 = io.of('/namespace1');
////
////// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
////namespace1.on('connection', (socket) => {
////  namespace1.emit('news', { hello: "Someone connected at namespace1" });
////});
////
////// NameSpace 2번
////const namespace2= io.of('/namespace2');
////
////// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
////namespace2.on('connection', (socket) => {
////  namespace1.emit('news', { hello: "Someone connected at namespace2" });
////});
//
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));
//app.set('view engine', 'html');
//app.set('views', '/static');

let room = ['room1', 'room2'];
let a = 0;

//app.get('/', (req, res) => {
//    res.render('index');
//});

/*외부클라이언트가 /css, /js경로로 액세스 가능*/

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
}) 

io.on('connection', (socket) => {
      socket.on('disconnect', () => {
          console.log('user disconnected');
      });
    socket.on('leaveRoom', (num, name) => {
        socket.leave(room[num], () => {
            console.log(name + ' leave a ' + room[num]);
            io.to(room[num]).emit('leaveRoom', num, name);
        });
    });
    socket.on('joinRoom', (num, name) => {
        socket.join(room[num], () => {
            console.log(name + ' join a ' + room[name]);
            io.to(room[num]).emit('joinRoom', num, name);
        });
    });
    
    socket.on('chat message', (num, name, msg) => {
        a = num;
        io.to(room  [a]).emit('chat message', name, msg);
    });
});

server.listen(3000, () => {
    console.log('connect at 3000');
})

//const app = require('express')();
//const server = require('http').Server(app);
//const io = require('socket.io')(server);
//
//app.set('view engine', 'ejs');
//app.set('views', '/views');
//
//let room = ['room1', 'room2'];
//let a = 0;
//
//app.get('/', (req, res) => {
//    res.render('chat');
//});
//
//io.on('connection', (socket) => {
//    socket.on('disconnect', () => {
//        console.log('user disconnected');
//    });
//    socket.on('leaveRoom', (num, name) => {
//        socket.leave(room[num], () => {
//            console.log(name + 'leave a ' + room[num]);
//            io.to(room[num]).emit('leaveRoom', num, name);
//        });
//    });
//    
//    socket.on('joinRoom', (num, name) => {
//        socket.join(room[num], () => {
//            console.log(name + 'join a' + room[num]);
//            io.to(room[num]).emit('joinRoom', num, name);
//        });
//    });
//    
//    socket.on('chatMessage', (num, name, msg) => {
//        a = num;
//        io.to(room[a]).emit('chatMessage', name, msg);
//    });
//});
//
//server.listen(3000, () => {
//    console.log('Connect at 3000');
//})