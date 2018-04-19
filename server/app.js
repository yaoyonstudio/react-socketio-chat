const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://localhost/react_socket");

const userRouter = require('./routes/userRoutes')
const User = require('./models/userModel')

const users = [
  {id: 1, username: 'ken', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon1.png'},
  {id: 2, username: 'yaoyon', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon2.png'},
  {id: 3, username: 'kenny', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon3.png'},
  {id: 4, username: 'yaoyonstudio', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon1.png'},
  {id: 5, username: 'lion', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon4.png'}
]

app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const onlineUsers = []

app.get('/', (req, res) => {
  res.send('<h1>Chat App</h1>');
})
app.use('/users', userRouter);


io.on('connection', function (socket) {
  console.log('一个用户连接到socket服务器');
  console.log(socket.id)

  // 响应用户登录请求
  socket.on('login', function (data) {
    console.log('服务器收到用户连接信息:', data)
    // 用户信息验证
    if (data.username && data.password) {
      User.findOne({
        username: data.username,
        password: data.password
      }, (err, user) => {
        if (user) {
          socket.emit('loged', { msg: `您好，${data.username}您当前已登录成功!`})

          if (onlineUsers.length) {
            let _index = undefined
            for (let i = 0, l = onlineUsers.length; i < l; i++) {
              if (onlineUsers[i]._id == user._id.toString()) {
                _index = i
              }
            }
            if (_index === undefined) {
              onlineUsers.push({
                sid: socket.id,
                _id: user._id.toString(),
                username: user.username
              })
            } else {
              // 更新socket session
              onlineUsers[_index].sid = socket.id
            }
          } else {
            onlineUsers.push({
              sid: socket.id,
              _id: user._id.toString(),
              username: user.username
            })
          }
        } else {
          socket.emit('logfail', {msg: '登录信息(用户名或密码)不正确'})
        }
      })
    }
    console.log('1-服务器当前在线人数:', onlineUsers)
  })

  // 响应用户发送文本消息请求
  socket.on('sendText', function (msg) {
    console.log('server receive:', msg)
    // console.log(socket.id)
    // console.log(io.sockets.sockets)
    let _toUser = undefined
    for (let i = 0, l = onlineUsers.length; i < l; i++) {
      if (msg.toUser.toString() === onlineUsers[i]._id.toString()) {
        _toUser = onlineUsers[i]
      }
    }
    // console.log('toUser1:', _toUser)
    if (_toUser) {
      let _msg = {
        data: msg.data,
        type: 'text',
        fromUser: msg.fromUser,
        from: msg.from,
        toUser: msg.toUser,
        to: msg.to
      }
      // console.log('toUser2:', _toUser)
      // console.log('sockets:', io.sockets.sockets)
      // console.log('toUser:', io.sockets.sockets[_toUser.sid])
      if (io.sockets.sockets[_toUser.sid]) {
        io.sockets.sockets[_toUser.sid].emit('receiveTextMsg', _msg)
      } else {
        console.log('用户离线中')
      }
    }
  })

  // 失去连接
  socket.on('disconnect', function () {
    console.log('用户失去连接', socket.id);
    console.log('2-服务器当前在线人数:', onlineUsers)
  });
});


http.listen(9000, function () {
  console.log('listening on *:9000');
});



