import axios from 'axios';

export default {
  fetchTodos: async () => {
    try {
      const res = await axios.get('/api/todos');
      const { success, todos, error } = res.data;
      if (success) {
        return todos;
      }
      throw error;
    } catch (err) {
      throw err;
    }
  },

  addTodo: async (text) => {
    console.log('api reqest', text);
    try {
      const res = await axios.post('/api/todos/add', { text });
      const { success, todo, error } = res.data;
      console.log('api', res.data);
      if (success) {
        return todo;
      }
      throw error;
    } catch (err) {
      throw err;
    }
  },

  updateTodo: async (updatedTodo) => {
    console.log('api reqest', updatedTodo);
    try {
      const res = await axios.post('/api/todos/complete', { updatedTodo });
      const { success, todo, error } = res.data;
      console.log('api', res.data);
      if (success) {
        return todo;
      }
      throw error;
    } catch (err) {
      throw err;
    }
  },

  deleteTodo: async (id) => {
    console.log('api reqest', id);
    try {
      const res = await axios.post('/api/todos/delete', { id });
      const { success, todo, error } = res.data;
      console.log('api', res.data);
      if (success) {
        return todo;
      }
      throw error;
    } catch (err) {
      throw err;
    }
  },
};
