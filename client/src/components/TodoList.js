import React from 'react';

import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = (props) => {
  return (
    <>
      <ul className='todo-list'>
          {
            props.todoList.map((todoItem) => (
              <TodoItem 
                key={todoItem._id} todoItem={todoItem} delete={props.delete} edit={props.edit} complete={props.complete} 
              />
            ))
          }
      </ul>
    </>
  );
};

export default TodoList;