import { userService } from '../Services'

export const GET_USER_INFO = 'user/GET_USER_INFO'
export const GET_FRIEND_INFO = 'user/GET_FRIEND_INFO'
export const GET_USER_FRIENDS = 'user/GET_USER_FRIENDS'
export const LOGIN = 'user/LOGIN'
export const REGISTER = 'user/REGISTER'
export const UPDATE_USER_AVATAR = 'user/UPDATE_USER_AVATAR'
export const UPDATE_USER_PASSWORD = 'user/UPDATE_USER_PASSWORD'
export const UPDATE_USER = 'user/UPDATE_USER'

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
        ...state
      };
    case GET_FRIEND_INFO:
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
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        me: {
          ...state.me,
          avatar: action.payload.data
        }
      }
    case UPDATE_USER_PASSWORD:
      console.log('password changed')
      return {
        ...state
      }
    case UPDATE_USER:
      console.log('更新个人信息：', action.payload.data)
      return {
        ...state,
        me: {
          ...state.me
        }
      }
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
        if (res.data.avatar) {
          localStorage.setItem('avatar', res.data.avatar)
        }
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

export const getUser = (params, token, callback) => {
  return dispatch => {
    userService.getUser({
      'authorization': 'Bearer ' + token
    }, params, (res) => {
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

export const getFriendBasic = (params, callback) => {
  return dispatch => {
    userService.getFriendBasic(params, (res) => {
      if (res.status) {
        dispatch({
          type: GET_FRIEND_INFO,
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

export const updateAvatar = (params, token, callback) => {
  return dispatch => {
    userService.updateAvatar({
      'authorization': 'Bearer ' + token
    }, params, (res) => {
      if (res.status) {
        localStorage.setItem('avatar', res.data)
        dispatch({
          type: UPDATE_USER_AVATAR,
          payload: {
            data: res.data
          }
        })
      }
      if (callback) callback(res)
    })
  }
}


export const updatePassword = (params, token, callback) => {
  return dispatch => {
    userService.updatePassword({
      'authorization': 'Bearer ' + token
    }, params, (res) => {
      if (res.status) {
        dispatch({
          type: UPDATE_USER_PASSWORD
        })
      }
      if (callback) callback(res)
    })
  }
}

export const updateUser = (id, params, token, callback) => {
  return dispatch => {
    userService.updateUser({
      'authorization': 'Bearer ' + token
    }, id, params, (res) => {
      if (res.status) {
        dispatch({
          type: UPDATE_USER,
          payload: {
            data: res.data
          }
        })
      }
      if (callback) callback(res)
    })
  }
}

