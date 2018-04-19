//引入mongoose
var mongoose = require('mongoose');

//定义数据库模式
var Schema = mongoose.Schema;
//创建用户模型
var userModel = new Schema({
	username: String,
	password: String,
	avatar: String
});

module.exports = mongoose.model("User", userModel);
