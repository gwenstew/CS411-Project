import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
import './App.css'
import { useEffect, useState } from 'react'
import React from 'react';
import Home from './home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
 
  return (
    <div className="App">
      <h1> College Kitchen </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
