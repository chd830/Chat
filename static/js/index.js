//'use strict';


/* 메시지 전송 함수 */
//  // 입력되어있는 데이터 가져오기
//  var message = document.getElementById('test').value
//  
//  // 가져왔으니 데이터 빈칸으로 변경
//  document.getElementById('test').value = ''
//
//  // 내가 전송할 메시지 클라이언트에게 표시
//  var chat = document.getElementById('chat')
//  var msg = document.createElement('div')
//  var node = document.createTextNode(message)
//  msg.classList.add('me')
//  msg.appendChild(node)
//  chat.appendChild(msg)
//
//  // 서버로 message 이벤트 전달 + 데이터와 함께
//  socket.emit('message', {type: 'message', message: message})
    const name = prompt('What your name');
    const socket = io();
    let room = ['room1', 'room2'];
    let num = 0;
    
    socket.emit('joinRoom', num, name);

    function changeSelect() {
      socket.emit('leaveRoom', num, name);
      num = num + 1;
      num = num % 2;
      socket.emit('joinRoom', num, name);  
    }

    function buttonClick() {
      socket.emit('chat message', num, name, $('#m').val());
      $('#m').val('');
      return false;
    };

   

    socket.on('chat message', function(name, msg) {
      $('#messages').append($('<li>').text(name + '  :  ' +
        msg));
    });

    socket.on('leaveRoom', function(num, name) {
      $('#messages').append($('<li>').text(name + '    leaved '
        + room[num] + ' :('));
    });

    socket.on('joinRoom', function(num, name) {
      $('#messages').append($('<li>').text(name + '    joined '
        + room[num] + ':)'));
    });
