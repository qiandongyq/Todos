import { combineReducers } from 'redux';
import { todoReducer } from './containers/todoList';

export default combineReducers({
  todoApp: todoReducer,
});
