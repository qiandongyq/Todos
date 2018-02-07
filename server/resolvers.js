const moment = require('moment');

module.exports = {
  Query: {
    getTodos: async (parent, args, { todos }) => {
      await setTimeout(() => todos, 3000);
      return todos;
    },
  },

  Mutation: {
    addTodo: (parent, { text }, { todos }) => {
      const ids = todos.map(todo => todo.id);
      let id = 1;
      if (ids.length !== 0) {
        id = Math.max(...ids) + 1;
      }

      const newTodo = {
        id,
        text,
        completed: false,
        completedAt: '',
      };

      todos.push(newTodo);
      return newTodo;
    },

    updateTodo: (parent, { id }, { todos }) => {
      const todoPos = todos.map(todo => todo.id).indexOf(id);
      const updatedTodo = {
        ...todos[todoPos],
        completed: !todos[todoPos].completed,
        completedAt: todos[todoPos].completedAt ? '' : moment().calendar(),
      };
      todos.splice(todoPos, 1);
      todos.push(updatedTodo);
      return updatedTodo;
    },

    deleteTodo: (parent, { id }, { todos }) => {
      const todoPos = todos.map(todo => todo.id).indexOf(id);
      const todo = todos[todoPos];
      todos.splice(todoPos, 1);
      return todo;
    },
  },
};
