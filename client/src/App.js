import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const editTodoHandler = async (event, id, newText, completed) => {
    event.preventDefault();

    if (completed) {
      const index = completedItems.findIndex(todo => todo.id === id);
      completedItems[index].text = newText;
    } else {
      const index = todoItems.findIndex(todo => todo.id === id);
      todoItems[index].text = newText;
    }

  }

  const deleteTodoHandler = (id, completed) => {
    if (completed) {
      const removeArr = [...completedItems].filter(todo => todo.id !== id);
      setCompletedItems(removeArr);
    } else {
      const removeArr = [...todoItems].filter(todo => todo.id !== id);
      setTodoItems(removeArr);
    }
  }

  const newTodoHandler = async (event) => {
    event.preventDefault();

    setTodoItems([{ id: Date.now(), text: text }, ...todoItems]);
    setText('');
    setError(null);
    event.target.reset();
    inputRef.current.focus();
  }

  const completeTodoHandler = async (id) => {
    const index = todoItems.findIndex(todo => todo.id === id);
    setCompletedItems([todoItems[index], ...completedItems])
    const removeArr = [...todoItems].filter(todo => todo.id !== id);
    setTodoItems(removeArr);
  }

  const uncompleteTodoHandler = async (id) => {
    const index = completedItems.findIndex(todo => todo.id === id);
    setTodoItems([completedItems[index], ...todoItems])
    const removeArr = [...completedItems].filter(todo => todo.id !== id);
    setCompletedItems(removeArr);
  }

  let todoList = <p>No TODO items added yet!</p>;

  if (error) {
    todoList = <p style={{ color: 'red' }}>{error}</p>;
  } else if (todoItems.length > 0) {
    todoList = <TodoList todoList={todoItems} delete={deleteTodoHandler} edit={editTodoHandler} complete={completeTodoHandler} uncomplete={uncompleteTodoHandler} completed={false} className="todo-list" />;
  }

  let todoCompleted = <p></p>;
  if (error) {
    todoCompleted = <p style={{ color: 'red' }}>{error}</p>;
  } else if (completedItems.length > 0) {
    todoCompleted = <TodoList todoList={completedItems} delete={deleteTodoHandler} edit={editTodoHandler} complete={completeTodoHandler} uncomplete={uncompleteTodoHandler} completed={true} className="todo-list" />;
  }

  return (
    <>
      <nav></nav>
      <div className="App-container">
        <section className='App-section1'>
          <form onSubmit={e => newTodoHandler(e)} id="add-todo-form" >
            <TextField inputRef={inputRef} type='text' id='todo-input' onInput={e => setText(e.target.value)} variant="outlined" multiline minRows={5} maxRows={10}
              placeholder='Enter new TODO item' autoFocus required />
            <br></br>
            <Button id='add-todo-button' variant="contained" color="primary" type="submit" form="add-todo-form">Add TODO</Button>
          </form>
        </section>
        <section className='App-section2'>
          <u><h2>Todo List</h2></u>
          {todoList}
        </section>
        <section className='App-section2'>
          <u><h2>Completed Tasks</h2></u>
          {todoCompleted}
        </section>
      </div>
    </>
  );
}

export default App;
