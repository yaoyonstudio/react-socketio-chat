const express = require('express')
const userRouter = express.Router()
const userControllers = require('../controllers/userControllers')
const ensureToken = require('../utils/common').ensureToken

userRouter.route('')
  .get(userControllers.getUsers)
userRouter.route('/:id')
  .get(userControllers.getUserBasic)
// userRouter.route('/login')
//   .post(userControllers.login)
// userRouter.route('/register')
  // .post(userControllers.register)
userRouter.route('/friends')
  .post(ensureToken, userControllers.getFriends)

module.exports = userRouter

