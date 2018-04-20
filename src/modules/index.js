import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import msg from './msg';

export default combineReducers({
  router: routerReducer,
  user,
  msg
});