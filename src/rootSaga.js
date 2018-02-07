import { all } from 'redux-saga/effects';
import { todoSagas } from './containers/todoList';

export default function* root() {
  yield all([
    ...todoSagas,
  ]);
}
