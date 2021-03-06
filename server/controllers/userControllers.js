const common = require('../utils/common')
const User = require('../models/userModel')
const Relation = require('../models/relationModel')
const jwt = require('jsonwebtoken')
const momont = require('moment')

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];
const baseImgPrefixer = config.domain + ':' + config.port + '/static/'

const fs = require('fs')
const baseDir = 'assets/avatar/'
const avatarDir = 'avatar/'

const createDir = function (baseDir) {
  var today = new Date()
  var directory = today.getFullYear().toString() + '/'
  if (!fs.existsSync(baseDir + directory)) {
    fs.mkdirSync(baseDir + directory)
  }
  var month = today.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  } 
  directory += today.getFullYear().toString() + month + '/'
  if (!fs.existsSync(baseDir + directory)) {
    fs.mkdirSync(baseDir + directory)
  }
  return baseDir + directory
}

const randomString = function (len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function decodeBase64Image (dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function jsGetAge(strBirthday){         
  var returnAge
  var strBirthdayArr=strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0 //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear //年之差  
    if(ageDiff > 0){  
      if(nowMonth == birthMonth) {  
        var dayDiff = nowDay - birthDay //日之差  
        if(dayDiff < 0) {  
          returnAge = ageDiff - 1
        } else {  
          returnAge = ageDiff
        }
      } else {  
        var monthDiff = nowMonth - birthMonth //月之差  
        if(monthDiff < 0)  
        {  
          returnAge = ageDiff - 1 
        } else {  
          returnAge = ageDiff 
        }  
      }  
    } else {  
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天  
    }
  }
  return returnAge //返回周岁年龄   
}

userControllers = {
  getUsers: (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
        // res.sendStatus(403);
        res.json({
          status: false,
          msg: '授权不通过'
        })
      } else {
        console.log(req.query)

        const _page = parseInt(req.query.page, 10) || 1
        const _limit = parseInt(req.query.limit, 10) || 10
        const _conditions = {}

        // const query = User.find()
        // query.$where(function () {
        //   return this.comments.length === 10 || this.name.length === 5;
        // })

        // User.pre('find', (next) => {
        //   console.log('pre')
        // })


        if (req.query.keyword) {
          _conditions['username'] = { $regex: new RegExp(req.query.keyword), $options: 'i'}
        }

        // if (req.query.min_age || req.query.max_age) {
        //   _conditions['birthday'] = {
        //     $gte: momont(date).subtract(parseInt(max_age, 10), 'years'),
        //     $lte: momont(date).subtract(parseInt(min_age, 10), 'years')
        //   }
        // }

        User.paginate(_conditions, { page: _page, limit: _limit}, (err, users) => {
          if (err) {
            res.send(common.output(false, {}, '查询失败'))
          } else {
            let _users = []
            users.docs.forEach(user => {
              _users.push({
                _id: user._id,
                username: user.username,
                avatar: baseImgPrefixer + user.avatar,
                gender: user.gender,
                lastlogin: user.lastlogin,
                birthday: user.birthday,
                province: user.province,
                city: user.city,
                district: user.district,
                company: user.company,
                job: user.job,
                slogan: user.slogan,
                interests: user.interests
              })
            });
            users.docs = _users
            res.send(common.output(true, users, '查询成功'))
          }
        })
      }
    })
  },
  getUser: (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
        // res.sendStatus(403);
        res.json({
          status: false,
          msg: '授权不通过'
        })
      } else {
        if (req.body && req.body._id) {
          User.findById(req.body._id, (err, user) => {
            if (err) {
              res.send(common.output(false, null, '没有找到指定用户'))
            } else {
              let _user = user._doc
              delete _user.password
              delete _user.status
              res.send(common.output(true, _user, '请求成功'));
            }
          })
        } else {
          res.send(common.output(false, null, '请求错误'))
        }
      }
    })
  },
  getFriendBasic: (req, res) => {
    if (req.body._id) {
      User.findById(req.body._id, (err, user) => {
        if (err) {
          res.send(common.output(false, null, '没有找到指定用户'))
        } else {
          let _user = {
            _id: user._id,
            username: user.username,
            avatar: baseImgPrefixer + user.avatar
          }
          res.send(common.output(true, _user, '请求成功'));
        }
      })
    } else {
      res.send(common.output(false, null, '请求错误'))
    }
  },
  // login: (req, res) => {
  //   let result
  //   if (req.body && req.body.username && req.body.password) {
  //     User.findOne({
  //       username: req.body.username,
  //       password: req.body.password
  //     }, (err, user) => {
  //       if (err) {
  //         res.send(common.output(false, {}, '出现异常'))
  //       } else {
  //         if (user) {
  //           res.send(common.output(true, user, '登录成功'))
  //         } else {
  //           res.send(common.output(false, {}, '登录失败'))
  //         }
  //       }
  //     })
  //   } else {
  //     res.send(common.output(false, null, '请求错误'))
  //   }
  // },
  // register: (req, res) => {
  //   const user = new User(req.body);
  //   if (req.body && req.body.username && req.body.password) {
  //     user.save((err) => {
  //       if (err) {
  //         res.send(common.output(false, null, '用户注册失败'))
  //       } else {
  //         res.send(common.output(true, user, '用户注册成功'))
  //       }
  //     })
  //   } else {
  //     res.send(common.output(false, null, '请求错误'))
  //   }
  // },
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
                let _users = []
                for (let i = 0, l = users.length; i < l; i++) {
                  let _user = {}
                  if (users[i].avatar) {
                    _user.avatar = baseImgPrefixer + users[i].avatar
                  }
                  _user._id = users[i]._id
                  _user.gender = users[i].gender
                  _user.username = users[i].username
                  _user.lastlogin = users[i].lastlogin
                  _users.push(_user)
                }
                res.send(common.output(true, _users, '请求成功'));
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
  },
  updateAvatar: (req, res) => {
    // console.log('body:', req.body)
    // console.log('token:', req.token)
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
        // res.sendStatus(403);
        res.json({
          status: false,
          msg: '授权不通过'
        })
      } else {
        // console.log('鉴权通过:', data)
        const imageBuffer = decodeBase64Image(req.body.img)
        // console.log(imageBuffer)
        let filename = randomString(9)
        const fileUrl = createDir(baseDir) + filename + '.jpg'
        const saveUrl = fileUrl.substring(7)
        fs.writeFile(fileUrl, imageBuffer.data, (err) => {
          if (err) {
            // console.log('写入图片文件失败:', err)
            res.send(common.output(false, {}, '头像写入失败'))
          } else {
            // 写入图片成功，更新用户表中头像字段
            User.findOneAndUpdate({_id: data.user}, {$set: {avatar: saveUrl}}, {new: true}, (err, user) => {
              if (err) {
                res.send(common.output(false, {}, '头像更新失败'))
              } else {
                res.send(common.output(true, config.domain + ':' + config.port + '/static/' + user.avatar, '头像更新成功'))
              }
            })
          }
        })
      }
    })
  },
  updatePassword: (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
        // res.sendStatus(403);
        res.json({
          status: false,
          msg: '授权不通过'
        })
      } else {
        User.findById(req.body._id, (err, user) => {
          if (err) {
            res.send(common.output(false, null, '没有找到指定用户'))
          } else {
            if (user.password === req.body.originPwd && req.body.password === req.body.rePassword) {
              User.findOneAndUpdate({_id: req.body._id}, {$set: {password: req.body.password}}, (err, user) => {
                if (err) {
                  res.send(common.output(false, {}, '用户密码更新失败'))
                } else {
                  res.send(common.output(true, {}, '用户密码更新成功'))
                }
              })
            } else {
              res.send(common.output(false, null, '原用户密码不正确或两次输入密码不一致'))
            }
          }
        })
      }
    })
  },
  updateUser: (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
        // res.sendStatus(403);
        res.json({
          status: false,
          msg: '授权不通过'
        })
      } else {
        User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, user) => {
          if (err) {
            res.send(common.output(false, {}, '用户更新失败'))
          } else {
            res.send(common.output(true, user, '用户更新成功'))
          }
        })
      }
    })
  },
  findFriends: (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
        // res.sendStatus(403);
        res.json({
          status: false,
          msg: '授权不通过'
        })
      } else {
        let _page = parseInt(req.body.page, 10) || 1
        let _limit = parseInt(req.body.limit, 10) || 10
        const _regex = new RegExp(req.body.keyword)
        User.paginate({ "username": { $regex: _regex, $options: 'i'} }, { page: _page, limit: _limit}, (err, users) => {
          if (err) {
            res.send(common.output(false, {}, '查询失败'))
          } else {
            res.send(common.output(true, users, '查询成功'))
          }
        })
      }
    })
  }
}

module.exports = userControllers
