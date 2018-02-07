import axios from 'axios';

const todoActions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_FAIL: 'REQUEST_FAIL',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',

  requestStart: () => ({
    type: todoActions.REQUEST_START,
  }),

  requestFail: error => ({
    type: todoActions.REQUEST_FAIL,
    payload: {
      error,
    },
  }),

  fetchTodosSuccess: todos => ({
    type: todoActions.FETCH_TODOS_SUCCESS,
    payload: {
      todos,
    },
  }),

  addTodoSuccess: todo => ({
    type: todoActions.ADD_TODO_SUCCESS,
    payload: {
      todo,
    },
  }),

  updateTodoSuccess: todo => ({
    type: todoActions.UPDATE_TODO_SUCCESS,
    payload: {
      todo,
    },
  }),

  deleteTodoSuccess: id => ({
    type: todoActions.DELETE_TODO_SUCCESS,
    payload: {
      id,
    },
  }),

  fetchTodos: () => async (dispatch) => {
    try {
      dispatch(todoActions.requestStart());
      const res = await axios.get('/api/todos');
      const { success, todos, error } = res.data;
      if (success) {
        dispatch(todoActions.fetchTodosSuccess(todos));
      } else {
        dispatch(todoActions.requestFail(error));
      }
    } catch (error) {
      dispatch(todoActions.requestFail(error));
    }
  },

  addTodo: text => async (dispatch) => {
    try {
      dispatch(todoActions.requestStart());
      const res = await axios.post('/api/todos/add', { text });
      const { success, todo, error } = res.data;
      if (success) {
        dispatch(todoActions.addTodoSuccess(todo));
      } else {
        dispatch(todoActions.requestFail(error));
      }
    } catch (error) {
      dispatch(todoActions.requestFail(error));
    }
  },

  updateTodo: updatedTodo => async (dispatch) => {
    try {
      dispatch(todoActions.requestStart());
      const res = await axios.post('/api/todos/complete', { updatedTodo });
      const { success, todo, error } = res.data;
      if (success) {
        dispatch(todoActions.updateTodoSuccess(todo));
      } else {
        dispatch(todoActions.requestFail(error));
      }
    } catch (error) {
      dispatch(todoActions.requestFail(error));
    }
  },

  deleteTodo: id => async (dispatch) => {
    try {
      dispatch(todoActions.requestStart());
      const res = await axios.post('/api/todos/delete', { id });
      const { success, error } = res.data;
      if (success) {
        dispatch(todoActions.deleteTodoSuccess(id));
      } else {
        dispatch(todoActions.requestFail(error));
      }
    } catch (error) {
      dispatch(todoActions.requestFail(error));
    }
  },
};

export default todoActions;

