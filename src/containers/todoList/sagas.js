import { call, put, takeLatest, fork } from 'redux-saga/effects';
import todoActions from './actions';
import API from './api';

function* fetchTodos() {
  try {
    yield put({ type: todoActions.REQUEST_START });
    const todos = yield call(API.fetchTodos);
    yield put({ type: todoActions.FETCH_TODOS_SUCCESS, payload: { todos } });
  } catch (err) {
    yield put({ type: todoActions.REQUEST_FAIL, payload: { error: err } });
  }
}

function* addTodo(action) {
  try {
    yield put({ type: todoActions.REQUEST_START });
    const todo = yield call(API.addTodo, action.payload.text);
    yield put({ type: todoActions.ADD_TODO_SUCCESS, payload: { todo } });
  } catch (err) {
    yield put({ type: todoActions.REQUEST_FAIL, payload: { error: err } });
  }
}

function* updateTodo(action) {
  try {
    yield put({ type: todoActions.REQUEST_START });
    const todo = yield call(API.updateTodo, action.payload.updatedTodo);
    yield put({ type: todoActions.UPDATE_TODO_SUCCESS, payload: { todo } });
  } catch (err) {
    yield put({ type: todoActions.REQUEST_FAIL, payload: { error: err } });
  }
}

function* deleteTodo(action) {
  try {
    yield put({ type: todoActions.REQUEST_START });
    yield call(API.deleteTodo, action.payload.id);
    yield put({ type: todoActions.DELETE_TODO_SUCCESS, payload: { id: action.payload.id } });
  } catch (err) {
    yield put({ type: todoActions.REQUEST_FAIL, payload: { error: err } });
  }
}

function* watchFetchTodos() {
  yield takeLatest(todoActions.FETCH_TODOS, fetchTodos);
}

function* watchAddTodos() {
  yield takeLatest(todoActions.ADD_TODO, addTodo);
}

function* watchUpdateTodo() {
  yield takeLatest(todoActions.UPDATE_TODO, updateTodo);
}

function* watchDeleteTodo() {
  yield takeLatest(todoActions.DELETE_TODO, deleteTodo);
}

const todoSagas = [
  fork(watchFetchTodos),
  fork(watchAddTodos),
  fork(watchUpdateTodo),
  fork(watchDeleteTodo),
];

export default todoSagas;
