const express = require('express')
const userRouter = express.Router()
const userControllers = require('../controllers/userControllers')

userRouter.route('')
  .get(userControllers.getUsers)
userRouter.route('/:id')
  .get(userControllers.getUser)
userRouter.route('/login')
  .post(userControllers.login)

module.exports = userRouter

