import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, saveTodo } from '../../reducers/todos';
import Button from '../Button/Button';
import './TodoItem.scss';

const TodoItem = ({ todo, index }) => {
  const [value, setValue] = useState(todo.value || '');
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteTodo(index));
  };

  const handleEditClick = () => {
    setIsActive(true);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (event.type === 'change') {
      setValue(value);
    }
  };

  const handleSaveClick = () => {
    dispatch(saveTodo(Object.assign(todo, { value })), index);
    setIsActive(false);
  };

  return (
    <li key={todo.id} className="todo-item">
      {!isActive && <span>{todo.value}</span>}
      {isActive && (
        <input
          type="text"
          value={value}
          aria-label="todos edit text"
          onChange={handleInputChange}
        />
      )}
      <div>
        <Button className="delete-btn" onClick={handleDeleteClick}>
          <i className="fas fa-trash" />
        </Button>
        {!isActive && (
          <Button className="edit-btn" onClick={handleEditClick}>
            <i className="fas fa-edit" />
          </Button>
        )}
        {isActive && (
          <Button className="save-btn" onClick={handleSaveClick}>
            <i className="fas fa-save" />
          </Button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
