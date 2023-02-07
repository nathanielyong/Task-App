import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<TodoApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
