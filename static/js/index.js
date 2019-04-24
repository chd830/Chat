//var socket = io();
//
//socket.on('connect', function() {
//    /* 접속 되었을 때 실행*/
//    var input = documnet.getElementById('test')
//    input.value = 'LogIn'
//})
//
//function send() {
//    var message = document.getElementById('test').value
//    /* 입력되어 있는 데이터 가져오기*/
//    document.getElementById('test').value = ''
//    
//    socket.emit('send',{ msg : message})
//    /* 서버로 send 이벤트 전달(데이터포함)*/
//}