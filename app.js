/* jslint devel: true */

////namespace안에 room 두 개 설정하기
//const app = require('express')();
//const http = require('http').Server(app);
//const io = require('socket.io')(server);
//
//server.listen(3000, () => {
//  console.log('connect 3000');
//});
//
//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/static/index.html');
//});
//
//// NameSpace 1번
//const namespace1 = io.of('/namespace1');
//
//// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
//namespace1.on('connection', (socket) => {
//  namespace1.emit('news', { hello: "Someone connected at namespace1" });
//});
//
//// NameSpace 2번
//const namespace2= io.of('/namespace2');
//
//// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
//namespace2.on('connection', (socket) => {
//  namespace1.emit('news', { hello: "Someone connected at namespace2" });
//});

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const fs = require('fs');

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));
//app.set('view engine', 'html');
//app.set('views', '/static');

let room = ['room1', 'room2'];
let a = 0;

//app.get('/', function(req, res) {
//    res.render('index');
//});
/* res의 render로 호출 가능한지 확인하기*/

/*외부클라이언트가 /css, /js경로로 액세스 가능*/

app.get('/', function(request, response) {
    fs.readFile('./views/chat.ejs', function(err, data) {
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            response.end()
        }
    })
}) 

io.on('connection', function(socket) {
    
    socket.on('newUser', function(name) {
        console.log(name + ' user connected');
        socket.name = name
        io.emit('update', {type: 'connect', name: 'SERVER', message: name + ' user connected'});
    })
    
    socket.on('send', function(data) {
        console.log('sended data:', data.msg);
    });
    
    socket.on('message', function(data) {
        data.name = socket.name;
        console.log(data);
        socket.broadcast.emit('update', data);
    });
    
    socket.on('disconnect', function() {
        console.log(socket.name + ' user disconnected');
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + ' user disconnected'});
      });
    
    socket.on('leaveRoom', function(num, name) {
        socket.leave(room[num], function() {
            console.log(name + ' leave a ' + room[num]);
            io.to(room[num]).emit('leaveRoom', num, name);
        });
    });
    socket.on('joinRoom', function(num, name) {
        socket.join(room[num], function() {
            console.log(name + ' join a ' + room[name]);
            io.to(room[num]).emit('joinRoom', num, name);
        });
    });
    
    socket.on('chat message', function(num, name, msg) {
        a = num;
        io.to(room[a]).emit('chat message', name, msg);
    });
});

server.listen(3000, function() {
    console.log('connect at 3000');
})
