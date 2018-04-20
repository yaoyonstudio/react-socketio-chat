// import { msgService } from '../Services'

import { randomString } from '../libs/keact/Helper'

export const GET_HISTORY_MSG = 'msg/GET_HISTORY_MSG'
export const GET_UNREAD_MSG = 'msg/GET_UNREAD_MSG'
export const PUSH_MSG = 'msg/PUSH_MSG'
export const CONCAT_MSGS = 'msg/CONCAT_MSGS'

const initialState = {
  msgs: {},
  currentSessionMsgs: [],
  key: randomString()
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY_MSG:
      return {
        ...state,
        currentSessionMsgs: state.msgs[action.payload.friendId] && state.msgs[action.payload.friendId].length ? state.msgs[action.payload.friendId] : []
      };
    case GET_UNREAD_MSG:
      return {
        ...state
      };
    case PUSH_MSG:
      let _msgs1 = state.msgs
      let _currentSessionMsgs1 = state.currentSessionMsgs

      if (_currentSessionMsgs1.length) {
        _currentSessionMsgs1.push(action.payload.data)
      } else {
        _currentSessionMsgs1 = [ action.payload.data ]
      }

      _msgs1[action.payload.friendId] = _currentSessionMsgs1

      return {
        ...state,
        key: randomString(),
        currentSessionMsgs: _currentSessionMsgs1,
        msgs: _msgs1
      };
    case CONCAT_MSGS:
      let _msgs2 = state.msgs
      let _currentSessionMsgs2 = state.currentSessionMsgs

      if (_currentSessionMsgs2.length) {
        _currentSessionMsgs2 = _currentSessionMsgs2.concat(action.payload.data)
      } else {
        _currentSessionMsgs2 = [ action.payload.data ]
      }

      _msgs2[action.payload.friendId] = _currentSessionMsgs2

      return {
        ...state,
        key: randomString(),
        currentSessionMsgs: _currentSessionMsgs2,
        msgs: _msgs2
      };
    default:
      return state;
  }
}


export const getHistoryMsg = (friendId) => {
  return dispatch => {
    dispatch({
      type: GET_HISTORY_MSG,
      payload: {
        friendId: friendId
      }
    })
  }
}


export const pushMsg = (friendId, msg) => {
  return dispatch => {
    dispatch({
      type: PUSH_MSG,
      payload: {
        friendId: friendId,
        data: msg
      }
    })
  }
}


export const concatMsgs = (friendId, msgs) => {
  return dispatch => {
    dispatch({
      type: CONCAT_MSGS,
      payload: {
        friendId: friendId,
        data: msgs
      }
    })
  }
}



