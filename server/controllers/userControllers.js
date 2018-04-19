const common = require('../utils/common')
const User = require('../models/userModel')

const users = [
  {id: 1, username: 'ken', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon1.png'},
  {id: 2, username: 'yaoyon', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon2.png'},
  {id: 3, username: 'kenny', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon3.png'},
  {id: 4, username: 'yaoyonstudio', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon1.png'},
  {id: 5, username: 'lion', password: '123456', avatar: 'https://jkxg.tigonetwork.com/img/demo/icon4.png'}
]

userControllers = {
  getUsers: (req, res) => {
    User.find((err, users) => {
      if (err) {
        common.output(false, null, '请求失败')
      } else {
        res.send(common.output(true, users, '请求成功'))
      }
    })
  },
  getUser: (req, res) => {
    let result
    if (req.params && req.params.id) {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.send(common.output(false, null, '没有找到指定用户'))
        } else {
          res.send(common.output(true, user, '请求成功'));
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  },
  login: (req, res) => {
    let result
    if (req.body && req.body.username && req.body.password) {
      User.findOne({
        username: req.body.username,
        password: req.body.password
      }, (err, user) => {
        if (err) {
          res.send(common.output(false, {}, '出现异常'))
        } else {
          if (user) {
            res.send(common.output(true, user, '登录成功'))
          } else {
            res.send(common.output(false, {}, '登录失败'))
          }
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  }
}

module.exports = userControllers
