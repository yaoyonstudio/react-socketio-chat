import { Ajax } from './libs/keact'
const apiUrl = 'http://localhost:9000'

export const userService = {
  // 获取所有用户数据
  getUsers (fn) {
    Ajax.call(this, apiUrl + '/users', 'get', null, fn)
  },
  // 获取单个用户数据
  getUser (id, fn) {
    Ajax.call(this, apiUrl + '/users/' + id, 'get', null, fn)
  },
  // 用户登录
  login (params, fn) {
    Ajax.call(this, apiUrl + '/users/login', 'post', params, fn)
  },
  // 用户注册
  register (params, fn) {
    Ajax.call(this, apiUrl + '/users/register', 'post', params, fn)
  },
  // 获取指定用户的好友数据，传参：user_id
  getFriends (params, fn) {
    Ajax.call(this, apiUrl + '/users/friends', 'post', params, fn)
  },
}
