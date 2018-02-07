import React from 'react';
import { TodoHeader } from './components';
import { TodoList } from './containers/todoList';

const App = () => (
  <div>
    <TodoHeader />
    <TodoList />
  </div>
);

export default App;
