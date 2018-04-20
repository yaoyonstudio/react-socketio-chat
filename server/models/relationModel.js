//引入mongoose
var mongoose = require('mongoose');

//定义数据库模式
var Schema = mongoose.Schema;
//创建用户模型
var relationModel = new Schema({
	user_id: String,
	friend_id: String
});

module.exports = mongoose.model("Relation", relationModel);
