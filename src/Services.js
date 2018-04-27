import { Ajax } from './libs/keact'
const apiUrl = 'http://localhost:9000'

export const userService = {
  // 获取所有用户数据
  getUsers (headers, fn) {
    Ajax.call(this, apiUrl + '/users', 'get', headers, null, fn)
  },
  // 获取单个用户数据
  getUser (headers, params, fn) {
    Ajax.call(this, apiUrl + '/users/get_user', 'post', headers, params, fn)
  },
  getFriendBasic (params, fn) {
    Ajax.call(this, apiUrl + '/users/get_friend_basic', 'post', {}, params, fn)
  },
  // 用户登录
  login (params, fn) {
    Ajax.call(this, apiUrl + '/users/login', 'post', {}, params, fn)
  },
  // 用户注册
  register (params, fn) {
    Ajax.call(this, apiUrl + '/users/register', 'post', {}, params, fn)
  },
  // 获取指定用户的好友数据，传参：user_id
  getFriends (headers, params, fn) {
    Ajax.call(this, apiUrl + '/users/friends', 'post', headers, params, fn)
  },
  // 更新用户头像
  updateAvatar (headers, params, fn) {
    Ajax.call(this, apiUrl + '/users/update_avatar', 'post', headers, params, fn)
  },
  updatePassword (headers, params, fn) {
    Ajax.call(this, apiUrl + '/users/update_password', 'post', headers, params, fn)
  },
  updateUser (headers, id, params, fn) {
    Ajax.call(this, apiUrl + '/users/' + id, 'patch', headers, params, fn)
  }
}

export const msgService = {}
