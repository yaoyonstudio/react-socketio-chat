//引入mongoose
var mongoose = require('mongoose');

//定义数据库模式
var Schema = mongoose.Schema;
//创建用户模型
var userModel = new Schema({
	username: String,
	password: String,
	avatar: String,
  nickname: String,
  telephone: String,
  email: String,
  qq: String,
  company: String,
  job: String,
  status: {             // 用户状态： 1 - 正常， 2 - 异常
    type: Number,
    default: 1
  },
  gender: {             // 性别： 1 - 男, 2 - 女
    type: Number,
    default: 1
  },
  birthday: Date,
  education: String,
  province: String,
  city: String,
  district: String,
  lprovince: String,
  lcity: String,
  ldistrict: String,
  slogan: String,       // 签名
  interest: String,     // 兴趣
  ctime: {
    type: Date,
    default: Date.now
  },
  lastlogin: {
    type: Date,
    default: Date.now
  },
  lastloginip: String
});

module.exports = mongoose.model("User", userModel);
