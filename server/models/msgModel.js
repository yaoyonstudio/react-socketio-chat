//引入mongoose
var mongoose = require('mongoose');

//定义数据库模式
var Schema = mongoose.Schema;
//创建用户模型
var msgModel = new Schema({
	data: String,
	type: String,       // 消息类型： 'text', 'image'
	fromUser: String,   // 消息来源用户 _id
	from: String,       // 消息来源用户 昵称
	toUser: String,     // 消息到达用户 _id
	to: String,         // 消息到达用户 昵称
  isRead: {           // 是否已读： 1 - 已读， 0 - 未读
    type: Number,
    default: 1
  },
  ctime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Msg", msgModel);


