import React, { useState } from "react";
import './index.css';
import {Todo} from "../Main/Main";

interface EditWindowProps {
  onClose: () => void;
  onSave: (id: string, text: string) => void;
  currentTodo?: Todo;
}

const EditWindow = ({onClose, onSave, currentTodo}: EditWindowProps) => {
  const [text, setText] = useState(currentTodo?.text || '');

  const handleSaveClick = () => {
    if (currentTodo) {
      onSave(currentTodo?.id, text);
      onClose();
    }
  };

  return (
    <section className='edit-window'>
      <div className='edit-window__container'>
        <button type='button' className='edit-window__close-button' onClick={onClose}>&#10006;</button>
        <div>
          <input type='text' value={text} onChange={(e) => setText(e.target.value)}/>
          {text && <button className='edit-window__button' type='button' onClick={handleSaveClick}>save</button>}
          <button className='edit-window__button' type='button' onClick={() => setText('')}>reset</button>  
        </div>        
      </div>
    </section>
  );
};

export default EditWindow;