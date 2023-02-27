import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={logout} />
        <Routes>
          <Route path='/' element={<TodoApp />} />
          <Route path='/login' element={<Login login={login} />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
