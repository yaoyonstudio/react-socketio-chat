const common = require('../utils/common')
const Msg = require('../models/msgModel')

msgControllers = {
  getHistoryMsg: (req, res) => {
  },
  getUnreadMsg: (id, callback) => {    // 获取未读信息
    if (!id || !callback) return
    Msg.find({toUser: id, isRead: 0}, (err, msgs) => {
      if (err) {
        // 
      } else {
        callback(msgs)
      }
    })
  },
  updateReadMsg: (id) => {        // 批量更新未读信息为已读
    Msg.update({toUser: id, isRead: 0}, {isRead: 1}, {multi: true}, (err, num) => {
      console.log('updated:', num)
    })
  },
  insertMsg: (msg) => {
    const _msg = new Msg(msg)
    _msg.save((err) => {
      console.log('save err status:', err)
    })
  }
}

module.exports = msgControllers
