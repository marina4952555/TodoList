import React, { useState } from "react";
import './index.css';
import TodoItem from "../TodoItem";
import EditWindow from "../EditWindow";
import { v4 as uuidv4 } from 'uuid';



export type Todo = {
  text: string;
  checked: boolean;
  id: string;
};

const Main = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>();
  
  const handleAddTodo = () => {
    if (isError) {
      setIsError(false);
    };

    const newTodo = {
      text: text,
      checked: false,
      id: uuidv4(),
    };

    const copiedTodos = todos.slice();
    copiedTodos.push(newTodo);
    setTodos(copiedTodos);
    setText('');
  };

  const handleCheckTodo = (id: string) => {
    const currentTodo = todos.find((item) => {
      if (item.id === id) {
        return item;
      }
    });

    if (currentTodo) {
      const newTodo = {...currentTodo, checked: !currentTodo.checked};
      const copiedTodos = todos.map((item) => {
        if (item.id === id) {
          return newTodo;
        }

        return item;
      });

      setTodos(copiedTodos);
    }
  };

  const handleDeleteTodo = (id: string) => {
    const copiedTodos = todos.filter((item) => item.id !== id);
    setTodos(copiedTodos);
  };

  const handleOpenEditWindow = (id: string) => {
    if (!isEditing) {
      setIsEditing(true);
      const currentTodo = todos.find((item) => item.id === id);
      setCurrentTodo(currentTodo);
    }
  }

  const handleEditTodo = (id: string, text: string) => {
    if (currentTodo) {
      const newTodo = {...currentTodo, text: text};
      const copiedTodos = todos.map((item) => {
        if (item.id === id) {
          return newTodo;
        }

        return item;
      });

      setTodos(copiedTodos);
    }
  };

  const clickAddButton = () => {
    (text.length >= 1) ? handleAddTodo() : setIsError(true);
  };

  const handleCloseWindow = () => {
    setIsEditing(false);
  }

  return (
    <main className='main'>
      <section className='main__input-section'>
        <div className='new-todo'>
          <label htmlFor='new-todo'>New todo</label>
          <input id='new-todo' className='new-todo__input' type='text' value={text} autoComplete='off' onChange={(e) => setText(e.target.value)} />
          <button className='new-todo__button' type='button' onClick={clickAddButton} >+ ADD</button>          
        </div>
        {isError && <p className='new-todo__error'>Please enter the text of your todo</p>}
      </section>
      <section className='main__container'>
        <ul className='main__todo-list'>
          {todos.map((item) => {
            return (
              <TodoItem handleCheck={handleCheckTodo} handleDelete={handleDeleteTodo} handleEdit={handleOpenEditWindow} text={item.text} key={item.id} id={item.id} checked={item.checked} />
            );
          })}
        </ul>
      </section>
      {isEditing && <EditWindow onClose={handleCloseWindow} onSave={handleEditTodo} currentTodo={currentTodo} />}
    </main>
  );
};

export default Main;