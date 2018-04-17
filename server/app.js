const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const onlineUsers = []

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
  console.log('一个用户已连接');

  socket.on('login', function (data) {
    console.log('服务器收到用户连接信息:', data)
    // 用户信息验证
    if (data.username && data.password && data.username === 'ken' && data.password === '123456') {
      socket.emit('loged', { msg: `您好，${data.username}您当前已登录成功!`})
      onlineUsers.push(data.username)
    }
  })

  socket.on('disconnect', function () {
    console.log('用户失去连接');
  });

  socket.on('sendText', function (msg) {
    console.log('server receive:', msg)
  })

});

http.listen(9000, function(){
  console.log('listening on *:9000');
});



