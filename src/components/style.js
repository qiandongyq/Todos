import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const TodoHeaderWrapper = styled.div`
  font-size: 50px;
  margin: 100px 0 30px;
  text-align: center;
`;

const TodoItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  grid-column-gap: 20px;
  height: 50px;
  margin: 20px 0;
  padding: 0 20px;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  &:hover {
    box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.2);
  }
  border-left: ${props => (props.completed ? '5px solid #00e676' : '5px solid #ff3981')};
`;

const Text = styled.div`
  text-decoration-line: ${props => (props.completed ? 'line-through' : 'none')};
  text-decoration-color: #00e676;
  color: ${props => (props.completed ? '#00e676' : 'black')};
  font-size: 18px;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeStamp = styled.div`
  color: #000;
  font-size: 14px;
`;

const ActionButton = styled(Button)``;

export { TodoHeaderWrapper, TodoItemWrapper, Text, TimeStamp, ActionButton };
