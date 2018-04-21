// multer配置文件，定义multer和上传路径 

const fs = require('fs')
const multer  = require('multer')
const baseDir = 'src/assets/uploads/'


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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, createDir(baseDir))
  },
  filename: function (req, file, cb) {
    console.log('file:', file)
    // 原始文件名：file.originalname
    // 文件类型：file.mimetype
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const limits = {
  fieldNameSize: 100000000,
  fieldSize: 1000 * 1024 * 1024,
  fileSize: 1000 * 1024 * 1024,
  files: 3
}

module.exports = multer({ storage: storage, limits: limits })
