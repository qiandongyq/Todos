import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Dimmer, Loader, Segment, Message } from 'semantic-ui-react';
import { TodoListWrapper } from './style';
import { TodoItem } from '../../components';
import todoActions from './actions';

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  handleClickAddButton = () => {
    const text = this.inputRef.inputRef.value;
    if (text) {
      this.props.addTodo(text);
      this.inputRef.inputRef.value = '';
    }
  };

  catchReturn = (e) => {
    const text = e.target.value;
    if (e.key === 'Enter' && text !== '') {
      this.props.addTodo(text);
      e.target.value = '';
      e.preventDefault();
    }
  };

  handleRef = (c) => {
    this.inputRef = c;
  };

  render() {
    const {
      todos, loading, error, updateTodo, deleteTodo,
    } = this.props;

    const sortedTodos = todos.sort((a, b) => a.text > b.text);
    const errorMessage = (
      <Message negative>
        <Message.Header>Something went wrong</Message.Header>
        <p>Please try again later</p>
      </Message>
    );
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
          errorMessage
        ) : (
          <Segment>
            <Dimmer active={loading} inverted>
              <Loader>Loading</Loader>
            </Dimmer>
            {sortedTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            ))}
          </Segment>
        )}
      </TodoListWrapper>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.shape([]),
  loading: PropTypes.bool,
  error: PropTypes.string,
  fetchTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  loading: false,
  error: '',
};

const mapStateToProps = state => ({
  todos: state.todoApp.todos,
  loading: state.todoApp.loading,
  error: state.todoApp.error,
});


const mapDispatchToProps = {
  fetchTodos: todoActions.fetchTodos,
  addTodo: todoActions.addTodo,
  updateTodo: todoActions.updateTodo,
  deleteTodo: todoActions.deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
