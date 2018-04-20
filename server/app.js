const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://localhost/react_socket");

const userRouter = require('./routes/userRoutes')
const User = require('./models/userModel')
const msgControllers = require('./controllers/msgControllers')


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
          
          // 如果该登录用户有未读信息
          msgControllers.getUnreadMsg(user._id.toString(), (msgs) => {
            if (msgs.length) {
              socket.emit('unreadMsg', msgs)
              // 将未读信息发回到客户端后更新数据库中的未读信息为已读isRead = 1
              msgControllers.updateReadMsg(user._id.toString())
            }
          })

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
      console.log('---------------')
      // console.log('toUser2:', _toUser)
      // console.log('sockets:', io.sockets.sockets)
      // console.log('toUser:', io.sockets.sockets[_toUser.sid])
      if (io.sockets.sockets[_toUser.sid]) {
        // 将消息插入到数据库
        msgControllers.insertMsg(_msg)
        // 响应给指定聊天用户
        io.sockets.sockets[_toUser.sid].emit('receiveTextMsg', _msg)
      }
    } else {
      console.log('用户离线中')
      // 将消息插入到数据库
      let insert_msg = msg
      insert_msg.isRead = 0
      msgControllers.insertMsg(insert_msg)
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



