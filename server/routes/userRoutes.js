const express = require('express')
const userRouter = express.Router()
const userControllers = require('../controllers/userControllers')
const ensureToken = require('../utils/common').ensureToken
const upload = require('../config/multer')

userRouter.route('')
  .get(ensureToken, userControllers.getUsers)        // http://localhost:9000/users?page=4&limit=3
userRouter.route('/:id')
  // .get(userControllers.getUser)
  .patch(ensureToken, userControllers.updateUser)
userRouter.route('/friends')
  .post(ensureToken, userControllers.getFriends)
userRouter.route('/get_friend_basic')
  .post(userControllers.getFriendBasic)
userRouter.route('/get_user')
  .post(ensureToken, userControllers.getUser)
userRouter.route('/update_avatar')
  .post(ensureToken, userControllers.updateAvatar)
userRouter.route('/update_password')
  .post(ensureToken, userControllers.updatePassword)
userRouter.route('/find_friends')
  .post(ensureToken, userControllers.findFriends)             // http://localhost:9000/users/find_friends   params: { page: 1, limit: 10, keyord: 'test' }
// userRouter.route('/login')
//   .post(userControllers.login)
// userRouter.route('/register')
  // .post(userControllers.register)
  
module.exports = userRouter

