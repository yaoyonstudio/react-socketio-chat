import { userService } from '../Services'

export const GET_USER_INFO = 'user/GET_USER_INFO'
export const GET_USER_FRIENDS = 'user/GET_USER_FRIENDS'
export const LOGIN = 'user/LOGIN'
export const REGISTER = 'user/REGISTER'

const initialState = {
  friends: [],
  sessions: [],
  me: {
    _id: localStorage.getItem('_id') ? localStorage.getItem('_id') : '',
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    password: localStorage.getItem('password') ? localStorage.getItem('password') : '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : '/img/avatar.png'
  },
  friend: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        friend: action.payload.data
      };
    case GET_USER_FRIENDS:
      return {
        ...state,
        friends: action.payload.data
      };
    case LOGIN:
      console.log('LOGIN:', action.payload.data)
      return {
        ...state,
        me: action.payload.data
      };
    default:
      return state;
  }
}


export const login = (username, password, callback) => {
  return dispatch => {
    userService.login({
      username: username,
      password: password
    }, res => {
      if (res.status) {
        localStorage.setItem('_id', res.data._id)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('avatar', res.data.avatar)
        dispatch({
          type: LOGIN,
          payload: {
            data: res.data
          }
        })
      }
      if (callback) {
        callback(res)
      }
    })
  }
}

export const register = (username, password, callback) => {
  return dispatch => {
    userService.register({
      username: username,
      password: password
    }, res => {
      if (res.status) {
        callback(res)
      }
    })
  }
}

export const getUser = (id, callback) => {
  return dispatch => {
    userService.getUser(id, (res) => {
      if (res.status) {
        dispatch({
          type: GET_USER_INFO,
          payload: {
            data: res.data
          }
        })
      }
      if (callback) {
        callback(res)
      }
    })
  }
}

export const getFriends = (id, token, callback) => {
  return dispatch => {
    userService.getFriends({
      'authorization': 'Bearer ' + token
    }, {user_id: id}, (res) => {
      console.log(res)
      if (res.status && res.data) {
        dispatch({
          type: GET_USER_FRIENDS,
          payload: {
            data: res.data
          }
        })
      }
      if (callback) {
        callback(res)
      }
    })
  }
}


