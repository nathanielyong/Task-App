import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TodoList from './TodoList';
import './TodoApp.css';

function TodoApp() {
  const [todoItems, setTodoItems] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const port = process.env.PORT || 3000;
  const url = `https://${window.location.hostname}:${port}/api`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
  };

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const response =
          await fetch(`${url}/todoList/`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
          });

        if (!response.ok) {
          throw new Error('Failed to fetch todo items');
        }

        const json = await response.json();
        setTodoItems(json);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }

    if (localStorage.getItem('jwt_token') !== null) {
      fetchTodoItems();
    }
  }, [port]);



  const editTodoHandler = async (e, id, newText, completed) => {
    e.preventDefault();

    const index = todoItems.findIndex(todo => todo._id === id);
    const items = [...todoItems];
    const item = items[index];
    item.text = newText;
    items[index] = item;
    setTodoItems(items);

    await fetch(`${url}/todoList/update/${id}/`, {
      method: "PUT",
      body: JSON.stringify({ text: newText, completed: completed }),
      headers: headers
    });
  }

  const deleteTodoHandler = async (id) => {
    setTodoItems([...todoItems].filter(todo => todo._id !== id));
    await fetch(`${url}/todoList/delete/${id}/`, {
      method: "DELETE",
      headers: headers
    });
  }

  const newTodoHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    inputRef.current.focus();

    const newItem = { text: text.trim(), date: Date.now(), completed: false };

    const response =
      await fetch(`${url}/todoList/add/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newItem)
      })
    
    const newTodoItem = await response.json();
    if (!response.ok) {
      newItem._id = Date.now();
      setTodoItems([newItem, ...todoItems]);
      return;
    }

    setTodoItems([newTodoItem, ...todoItems]);
    setText('');
    setError(null);
  }

  const completeTodoHandler = async (id) => {
    const index = todoItems.findIndex(todo => todo._id === id);
    const items = [...todoItems];
    const item = items[index];
    item.completed = !item.completed;
    items[index] = item;
    setTodoItems(items);

    await fetch(`${url}/todoList/update/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(item)
    });
  }

  const todoList = todoItems.filter(todo => !todo.completed);
  let content = <p>No TODO items added yet!</p>;
  if (error) {
    content = <p style={{ color: 'red' }}>{error}</p>;
  } else if (todoItems.length > 0) {
    content = <TodoList todoList={todoList} delete={deleteTodoHandler} edit={editTodoHandler} complete={completeTodoHandler} completed={false} className="todo-list" />;
  }

  const completedList = todoItems.filter(todo => todo.completed);
  let content2 = <p></p>;
  if (error) {
    content2 = <p style={{ color: 'red' }}>{error}</p>;
  } else if (todoItems.length > 0) {
    content2 = <TodoList todoList={completedList} delete={deleteTodoHandler} edit={editTodoHandler} complete={completeTodoHandler} completed={true} className="todo-list" />;
  }

  return (
    <>
      <div className="App-container">
        { localStorage.getItem('jwt_token') === null && <h1>Login to save your changes</h1> }
        <section className='App-section1'>
          <form onSubmit={e => newTodoHandler(e)} id="add-todo-form" >
            <TextField inputRef={inputRef} type='text' id='todo-input' onInput={e => setText(e.target.value)} variant="outlined" multiline minRows={5} maxRows={10}
              placeholder='Enter new TODO item' inputProps={{ maxLength: 1000 }} autoFocus required />
            <Button id='add-todo-button' variant="contained" color="primary" type="submit" form="add-todo-form">Add TODO</Button>
          </form>
        </section>
        <section className='App-section2'>
          <u><h2>Todo List</h2></u>
          {content}
        </section>
        <section className='App-section2'>
          <u><h2>Completed Tasks</h2></u>
          {content2}
        </section>
      </div>
    </>
  );
}

export default TodoApp;
