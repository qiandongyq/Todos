import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

export const GET_TODOS = gql`
  query {
    getTodos {
      id
      text
      completed
      completedAt
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodoMutation($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
      completedAt
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodoMutation($id: Int!) {
    updateTodo(id: $id) {
      id
      text
      completed
      completedAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodoMutation($id: Int!) {
    deleteTodo(id: $id) {
      id
      text
      completed
      completedAt
    }
  }
`;

const TodoListGQL = Component =>
  compose(
    graphql(GET_TODOS, { name: 'getTodos' }),
    graphql(ADD_TODO, { name: 'addTodoMutation' }),
    graphql(UPDATE_TODO, { name: 'updateTodoMutation' }),
    graphql(DELETE_TODO, { name: 'deleteTodoMutation' }),
  )(Component);

export default TodoListGQL;
