import React from 'react';
import PropTypes from 'prop-types';
import { TodoItemWrapper, Text, TimeStamp, ActionButton } from './style';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const {
    completed, id, text, completedAt,
  } = todo;
  return (
    <TodoItemWrapper completed={completed}>
      <Text completed={completed}>{text}</Text>
      <TimeStamp>{completed && completedAt}</TimeStamp>
      <ActionButton
        color={completed ? 'purple' : 'green'}
        inverted
        onClick={() => updateTodo(todo.id)}
      >
        {completed ? 'UNDO' : 'DONE'}
      </ActionButton>
      <ActionButton color="red" inverted onClick={() => deleteTodo(id)}>
        DELETE
      </ActionButton>
    </TodoItemWrapper>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    completed: PropTypes.bool,
    completedAt: PropTypes.string,
  }),
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  todo: {},
};

export default TodoItem;
