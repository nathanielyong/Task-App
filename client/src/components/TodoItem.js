import React, { useState, useRef } from 'react';
import './TodoItem.css';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TodoItem = (props) => {
  const [text, setText] = useState(props.todoItem.text);
  const textRef = useRef();

  const saveEdit = (e) => {
    e.preventDefault();
    textRef.current.blur();
    props.edit(e, props.todoItem._id, text, props.todoItem.completed);
  }

  const editItem = () => {
    textRef.current.focus();
  }

  const handleCheckbox = (e) => {
    props.complete(props.todoItem._id);
  }

  const handleInput = (e) => {
    if (e.currentTarget.textContent.length > 1000) {
      textRef.current.textContent = text;
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    else 
      setText(e.currentTarget.textContent);
  }

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      saveEdit(e);
    }
  }

  return (
    <>
      <li className='todo-item'>
        <Checkbox icon={<RadioButtonUncheckedIcon color='primary' />} checkedIcon={<CheckCircleIcon color='primary' />} defaultChecked={props.todoItem.completed} onChange={handleCheckbox} />
        <div className="todo-text-container">
          <p ref={textRef} className="todo-text" contentEditable suppressContentEditableWarning={true} style={props.todoItem.completed ? { textDecoration: 'line-through' } : {}} onInput={handleInput} onClick={editItem} onBlur={saveEdit} onKeyDown={handleSubmit}>{props.todoItem.text}</p>
        </div>
        <IconButton className="button" variant="contained" color="success" onClick={editItem}><EditOutlinedIcon /></IconButton>
        <IconButton className="button" variant="contained" color="error" onClick={() => props.delete(props.todoItem._id, props.todoItem.completed)}><DeleteOutlinedIcon /></IconButton>
      </li>
    </>
  )
};

export default TodoItem;
