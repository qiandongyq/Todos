const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
let todos = require('./data.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/todos', (req, res) => {
  setTimeout(() => {
    res.send({ success: true, error: false, todos });
  }, 1000);
});

app.post('/api/todos/add', (req, res) => {
  const ids = todos.map(todo => todo.id);
  let id = 1;
  if (ids.length !== 0) {
    id = Math.max(...ids) + 1;
  }

  const newTodo = {
    id,
    text: req.body.text,
    completed: false,
  };

  todos.push(newTodo);
  setTimeout(() => {
    res.send({ success: true, error: false, todo: newTodo });
  }, 1000);
});

app.post('/api/todos/complete', (req, res) => {
  const updatedTodo = {
    ...req.body.updatedTodo,
    completedAt: moment().calendar(),
  };

  todos = todos.filter(todo => todo.id !== req.body.todoId);
  todos.push(updatedTodo);

  setTimeout(() => {
    res.send({ success: true, error: false, todo: updatedTodo });
  }, 1000);
});

app.post('/api/todos/delete', (req, res) => {
  console.log(req.body.id);

  todos = todos.filter(todo => todo.id !== req.body.id);
  setTimeout(() => {
    res.send({ success: true, error: false });
  }, 1000);
});

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runing on PORT: ${PORT}`);
});
