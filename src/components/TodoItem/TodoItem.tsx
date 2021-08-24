import React, { useState } from "react";
import './index.css';

interface TodoItemProps {
  text: string
  checked: boolean;
  id: string;
  handleCheck: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

const TodoItem = ({text, checked, id, handleCheck, handleDelete, handleEdit}: TodoItemProps) => {

  const getTextClassname = (mainClassname: string, modificator: string) => {
    return checked ? `${mainClassname} ${modificator}` : mainClassname;
  };


  const clickEdit = () => {
    handleEdit(id);
  };

  return (
    <li className='new-todo__item' onClick={() => handleCheck(id)}>
      <div className={getTextClassname('new-todo__check', 'new-todo__check--chtcked')}>
        <img src="img/checked.svg" width="25px" height="25px" alt="checked" />
      </div>
      <p className={getTextClassname('new-todo__item-text', 'new-todo__item-text--checked')}>{text}</p>
      <div className='new-todo__item-controls' onClick={(e) => e.stopPropagation()}>
        <button className='new-todo__item-button' type='button' onClick={clickEdit}>
          <img src='img/edit.svg' width="20px" height="20px" alt="edit" />
        </button>
        <button className='new-todo__item-button' type='button' onClick={() => handleDelete(id)}>
          <img src='img/del.svg' width="20px" height="20px" alt="del" />
        </button>
      </div>
    </li>

  );
};

export default TodoItem;
