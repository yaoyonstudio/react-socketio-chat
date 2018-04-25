//引入mongoose
var mongoose = require('mongoose');
// 分页
const mongoosePaginate = require('mongoose-paginate');

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
  birthday: String,
  education: String,
  lat: String,
  lng: String,
  province: String,
  provinceId: Number,
  city: String,
  cityId: Number,
  district: String,
  districtId: Number,
  lprovince: String,
  lprovinceId: Number,
  lcity: String,
  lcityId: Number,
  ldistrict: String,
  ldistrictId: Number,
  slogan: String,       // 签名
  interestIds: String,     // 兴趣ID
  interests: String,       // 兴趣字符串
  ctime: {
    type: Date,
    default: Date.now
  },
  mtime: {
    type: Date,
    default: Date.now
  },
  lastlogin: {
    type: Date,
    default: Date.now
  },
  lastloginip: String
});

userModel.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userModel);
