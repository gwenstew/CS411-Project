import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import { useState, useEffect } from 'react'
import React from 'react';
import Home from './home';
import SignIn from './googleSignIn';
import Write from "./components/Write";
import Read from "./components/Read";
import Update from "./components/Update";
import UpdateWrite from "./components/UpdateWrite";
import Pantry from "./pantry";
import FavoriteRecipes from "./favorites";
// import SignOut from './SignOut';
import Profile from './profile';


function App() {
  // const [loggedIn, setLoggedIn] = useState(false)
  // const [email, setEmail] = useState('');
  // const [user, setUser] = useState(null);
 
  return (
    <div className="App">
      <h1 className='brand'> College Kitchen </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/home" element={<Home />} /> 
          <Route path="/write" element={<Write/>}/>
          <Route path="/read" element={<Read/>}/>
          <Route path="/update" element={<Update/>}/>
          <Route path="/updatewrite/:firebaseId" element={ <UpdateWrite /> } />
          <Route path="/pantry" element={<Pantry/>}/>
          <Route path="/favorites" element={<FavoriteRecipes/>}/>
          {/* <Route path="/" element={<SignOut/>}/> */}
          <Route path="/profile" element={<Profile/>}/>

          

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
