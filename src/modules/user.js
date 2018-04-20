import { userService } from '../Services'

export const GET_USER_INFO = 'user/GET_USER_INFO'
export const GET_USER_FRIENDS = 'user/GET_USER_FRIENDS'
export const LOGIN = 'user/LOGIN'
export const REGISTER = 'user/REGISTER'

const initialState = {
  friends: [],
  sessions: [],
  me: {},
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
    // if (localStorage.getItem('_id') && localStorage.getItem('password') && localStorage.getItem('username')) {
    //   dispatch({
    //     type: LOGIN,
    //     payload: {
    //       data: {
    //         _id: localStorage.getItem('_id'),
    //         username: localStorage.getItem('username'),
    //         avatar: localStorage.getItem('avatar') || '',
    //         password: localStorage.getItem('password')
    //       }
    //     }
    //   })
    //   return
    // }
    userService.login({
      username: username,
      password: password
    }, res => {
      if (res.status) {
        localStorage.setItem('_id', res.data._id)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('password', res.data.password)
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

export const getFriends = (id, callback) => {
  return dispatch => {
    userService.getFriends({user_id: id}, (res) => {
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


