import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Dimmer, Loader, Segment, Message } from 'semantic-ui-react';
import { TodoListWrapper } from './style';
import { TodoItem } from '../../components';
import TodoListGQL, { GET_TODOS } from './graphql';

class TodoList extends Component {
  addTodo = async (text) => {
    await this.props.addTodoMutation({
      variables: {
        text,
      },
      update: (store, { data: { addTodo } }) => {
        const data = store.readQuery({ query: GET_TODOS });
        data.getTodos.push(addTodo);
        store.writeQuery({ query: GET_TODOS, data });
      },
    });
  };

  updateTodo = async (id) => {
    await this.props.updateTodoMutation({
      variables: {
        id,
      },
    });
  };

  deleteTodo = async (id) => {
    await this.props.deleteTodoMutation({
      variables: {
        id,
      },
      update: (store) => {
        const data = store.readQuery({ query: GET_TODOS });
        console.log(data);
        const todoPos = data.getTodos.map(todo => todo.id).indexOf(id);
        data.getTodos.splice(todoPos, 1);
        store.writeQuery({ query: GET_TODOS, data });
      },
    });
  };

  handleClickAddButton = async () => {
    const text = this.inputRef.inputRef.value;
    this.inputRef.inputRef.value = '';
    if (text) {
      this.addTodo(text);
    }
  };

  catchReturn = (e) => {
    const text = e.target.value;
    if (e.key === 'Enter' && text !== '') {
      this.addTodo(text);
      e.target.value = '';
      e.preventDefault();
    }
  };

  handleRef = (c) => {
    this.inputRef = c;
  };

  errorMessage = error => (
    <Message negative>
      <Message.Header>{error && error.message}</Message.Header>
      <p>Please try again later</p>
    </Message>
  );

  render() {
    const { getTodos: { loading, getTodos = [], error } = {} } = this.props;
    const todos = [...getTodos].sort((a, b) => a.id > b.id);
    return (
      <TodoListWrapper>
        <Input
          placeholder="Add Todos ..."
          fluid
          action={{
            icon: 'add',
            onClick: () => this.handleClickAddButton(),
          }}
          onKeyDown={this.catchReturn}
          ref={this.handleRef}
        />
        {error ? (
          this.errorMessage(error)
        ) : (
          <Segment>
            <Dimmer active={loading} inverted>
              <Loader>Loading</Loader>
            </Dimmer>
            {!loading &&
              !error &&
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  updateTodo={this.updateTodo}
                  deleteTodo={this.deleteTodo}
                />
              ))}
          </Segment>
        )}
      </TodoListWrapper>
    );
  }
}

TodoList.propTypes = {
  getTodos: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    allTodos: PropTypes.array,
  }),
  addTodoMutation: PropTypes.func.isRequired,
  updateTodoMutation: PropTypes.func.isRequired,
  deleteTodoMutation: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  getTodos: {
    loading: false,
    error: {},
    getTodos: [],
  },
};

export default TodoListGQL(TodoList);
