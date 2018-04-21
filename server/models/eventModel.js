//引入mongoose
var mongoose = require('mongoose');

//定义数据库模式
var Schema = mongoose.Schema;
//创建用户模型
var eventModel = new Schema({
	from: String,					// 事件发起方
	to: String,						// 事件接收方
	type: String,					// 事件类型
	desc: String					// 备注
});

module.exports = mongoose.model("Event", eventModel);
