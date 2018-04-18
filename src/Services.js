import { Ajax } from './libs/keact'
const apiUrl = 'http://localhost:9000'

export const userService = {
  getUsers (fn) {
    Ajax.call(this, apiUrl + '/users', 'get', null, fn)
  },
  getUser (id, fn) {
    Ajax.call(this, apiUrl + '/users/' + id, 'get', null, fn)
  },
  login (params, fn) {
    Ajax.call(this, apiUrl + '/users/login', 'post', params, fn)
  }
}
