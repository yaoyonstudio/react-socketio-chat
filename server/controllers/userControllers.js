const common = require('../utils/common')
const User = require('../models/userModel')
const Relation = require('../models/relationModel')

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
  },
  register: (req, res) => {
    const user = new User(req.body);
    if (req.body && req.body.username && req.body.password) {
      user.save((err) => {
        if (err) {
          res.send(common.output(false, null, '用户注册失败'))
        } else {
          res.send(common.output(true, user, '用户注册成功'))
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  },
  getFriends: (req, res) => {
    if (req.body && req.body.user_id) {
      Relation.find({user_id: req.body.user_id}, (err, relations) => {
        if (err) {
          res.send(common.output(false, null, '没有找到好友关系'))
        } else {
          let _ids = []
          if (relations.length) {
            relations.map(relation => _ids.push(relation.friend_id))
            User.find({_id: {'$in': _ids}}, (err, users) => {
              if (err) {
                res.send(common.output(false, null, '找好友数据时出错'))
              } else {
                res.send(common.output(true, users, '请求成功'));
              }
            })
          } else {
            res.send(common.output(false, null, '没有找到好友'))
          }
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  }
}

module.exports = userControllers
