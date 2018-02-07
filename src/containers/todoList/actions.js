const todoActions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_FAIL: 'REQUEST_FAIL',

  FETCH_TODOS: 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',

  UPDATE_TODO: 'UPDATE_TODO',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',

  DELETE_TODO: 'DELETE_TODO',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',

  ADD_TODO: 'ADD_TODO',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',


  requestSuccess: () => ({
    type: todoActions.REQUEST_SUCCESS,
  }),

  requestFail: error => ({
    type: todoActions.REQUEST_FAIL,
    payload: {
      error,
    },
  }),

  fetchTodos: () => ({
    type: todoActions.FETCH_TODOS,
  }),

  addTodo: text => ({
    type: todoActions.ADD_TODO,
    payload: {
      text,
    },
  }),

  updateTodo: updatedTodo => ({
    type: todoActions.UPDATE_TODO,
    payload: {
      updatedTodo,
    },
  }),

  deleteTodo: id => ({
    type: todoActions.DELETE_TODO,
    payload: {
      id,
    },
  }),

};


export default todoActions;
