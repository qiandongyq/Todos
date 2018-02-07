import todoActions from './actions';

const initialState = {
  todos: [],
  loading: false,
  error: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActions.REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case todoActions.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
      };
    case todoActions.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload.todo],
      };
    case todoActions.UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todo.id) {
            return Object.assign({}, todo, {
              ...action.payload.todo,
            });
          }
          return todo;
        }),
      });
    case todoActions.DELETE_TODO_SUCCESS:
      console.log(action.payload.id);
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case todoActions.REQUEST_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default todoReducer;
