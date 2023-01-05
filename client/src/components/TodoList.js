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
                todoItem={todoItem} key={todoItem.id} delete={props.delete} edit={props.edit} complete={props.complete} uncomplete={props.uncomplete} completed={props.completed}
              />
            ))
          }
      </ul>
    </>
  );
};

export default TodoList;