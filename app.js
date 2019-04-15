/* jslint devel: true */
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs');

const app = express()

const server = http.createServer(app)

const io = socket(server)
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
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
    console.log('user login')
    response.send('Hello Express Server')
}) 

server.listen(8080, function() {
    console.log('server loading')
})

/* require로 모듈 불러오기 */
/* listen메소드로 서버 시작하기 */
/* response.send로 데이터 보내기 */