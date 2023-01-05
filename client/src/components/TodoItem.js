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
    props.edit(e, props.todoItem.id, text, props.completed);
  }

  const editItem = () => {
    textRef.current.focus();
  }

  const handleChange = (e) => {
    if (e.target.checked) {
      props.complete(props.todoItem.id);
    } else {
      props.uncomplete(props.todoItem.id);
    }
  }
  return (
    <>
      <li className='todo-item'>
        <Checkbox icon={<RadioButtonUncheckedIcon color='primary' />} checkedIcon={<CheckCircleIcon color='primary' />} defaultChecked={props.completed} onChange={e => handleChange(e)} />
        <div className="todo-text-container">
          <p ref={textRef} className="todo-text" contentEditable suppressContentEditableWarning={true} style={props.completed ? { textDecoration: 'line-through' } : {}} onInput={e => setText(e.currentTarget.textContent)} onClick={() => editItem()} onBlur={e => saveEdit(e)}>{props.todoItem.text}</p>
        </div>
        <IconButton className="button" variant="contained" color="success" onClick={() => editItem()}><EditOutlinedIcon /></IconButton>
        <IconButton className="button" variant="contained" color="error" onClick={() => props.delete(props.todoItem.id, props.completed)}><DeleteOutlinedIcon /></IconButton>
      </li>
    </>
  )
};

export default TodoItem;
