var jwt = require('jsonwebtoken')
var bCrypt = require('bcrypt-nodejs')
const User = require('../models/userModel')
const common = require('../utils/common')

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];
const baseImgPrefixer = config.domain + ':' + config.port + '/static/'

const isValidPassword = (userpass, password) => bCrypt.compareSync(password, userpass)

module.exports = (app, passport) => {
  app.post('/users/register', (req, res) => {
    if (req.body && req.body.username && req.body.password) {
      User.findOne({
        username: req.body.username
      }, (err, _user) => {
        if (_user) {
          res.send(common.output(false, null, '用户名已存在'))
        } else {
          const user = new User(req.body);
          user.save((err) => {
            if (err) {
              res.send(common.output(false, null, '用户注册失败'))
            } else {
              res.send(common.output(true, user, '用户注册成功'))
            }
          })
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  })

  app.post('/users/login', (req, res) => {
    if (req.body && req.body.username && req.body.password) {
      User.findOne({
        username: req.body.username,
        password: req.body.password
      }, (err, user) => {
        if (err) {
          res.send(common.output(false, {}, '出现异常'))
        } else {
          if (user) {
            const token = jwt.sign({ user: user.id }, 'my_secret_key');
            let _userInfo = {
              _id: user._id,
              username: user.username,
              token: token,
              avatar: baseImgPrefixer + user.avatar
            }
            res.send(common.output(true, _userInfo, '登录成功'))
          } else {
            res.send(common.output(false, {}, '登录失败'))
          }
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  })
}
