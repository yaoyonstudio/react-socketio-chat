const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

const output = function (status, data, msg) {
	return JSON.stringify({status: status, data: data, msg: msg})
}

const users = [
  {id: 1, username: 'ken', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon1.png'},
  {id: 2, username: 'yaoyon', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon2.png'},
  {id: 3, username: 'kenny', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon3.png'},
  {id: 4, username: 'yaoyonstudio', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon1.png'},
  {id: 5, username: 'lion', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon4.png'}
]
const onlineUsers = []


const userRouter = express.Router()
const userControllers = {
  getUsers: (req, res) => {
    res.send(output(true, users, '请求成功'))
  },
  getUser: (req, res) => {
    let result
    if (req.params && req.params.id) {
      for (let i = 0, l = users.length; i < l; i++) {
        if (users[i].id === parseInt(req.params.id)) {
          result = users[i]
        }
      }
    }
    if (result) {
      res.send(output(true, result, '请求成功'))
    } else {
      res.send(output(false, null, '没有找到指定用户'))
    }
  },
  login: (req, res) => {
    let result
    console.log(req.body)
    if (req.body && req.body.username && req.body.password) {
      for (let i = 0, l = users.length; i < l; i++) {
        if (users[i].username === req.body.username && users[i].password === req.body.password) {
          result = users[i]
        }
      }
    }
    if (result) {
      res.send(output(true, result, '登录成功'))
    } else {
      res.send(output(false, {}, '登录失败'))
    }
  }
}
userRouter.route('')
  .get(userControllers.getUsers)
userRouter.route('/:id')
  .get(userControllers.getUser)
userRouter.route('/login')
  .post(userControllers.login)

app.get('/', (req, res) => {
  res.send('<h1>Chat App</h1>');
});
app.use('/users', userRouter);



io.on('connection', function (socket) {
  console.log('一个用户连接到socket服务器');
  console.log(socket.id)

  // 响应用户登录请求
  socket.on('login', function (data) {
    console.log('服务器收到用户连接信息:', data)
    // 用户信息验证
    if (data.username && data.password) {
      let user = null
      for (let i = 0, l = users.length; i < l; i++) {
        if (users[i].username === data.username && users[i].password === data.password) {
          user = users[i]
        }
      }
      if (user) {
        socket.emit('loged', { msg: `您好，${data.username}您当前已登录成功!`})

        if (onlineUsers.length) {
          let _index = undefined
          for (let i = 0, l = onlineUsers.length; i < l; i++) {
            if (onlineUsers[i].id === user.id) {
              _index = i
            }
          }
          if (_index === undefined) {
            onlineUsers.push({
              sid: socket.id,
              id: user.id,
              username: user.username
            })
          }
        } else {
          onlineUsers.push({
            sid: socket.id,
            id: user.id,
            username: user.username
          })
        }

        console.log('当前在线用户：', onlineUsers)
      } else {
        socket.emit('logfail', {msg: '登录信息(用户名或密码)不正确'})
      }
    }
  })

  // 响应用户发送文本消息请求
  socket.on('sendText', function (msg) {
    console.log('server receive:', msg)
    // console.log(socket.id)
    // console.log(io.sockets.sockets)
    let _toUser = undefined
    for (let i = 0, l = onlineUsers.length; i < l; i++) {
      if (parseInt(msg.toUser, 10) === parseInt(onlineUsers[i].id, 10)) {
        _toUser = onlineUsers[i]
      }
    }
    if (_toUser) {
      let _msg = {
        data: msg.data,
        type: 'text',
        fromUser: msg.fromUser,
        from: msg.from,
        toUser: msg.toUser,
        to: msg.to
      }
      console.log('toUser:', _toUser)
      console.log('toUser:', io.sockets.sockets[_toUser.sid])
      io.sockets.sockets[_toUser.sid].emit('receiveTextMsg', _msg)
    }
  })

  // 失去连接
  socket.on('disconnect', function () {
    console.log('用户失去连接');
  });
});

http.listen(9000, function(){
  console.log('listening on *:9000');
});



