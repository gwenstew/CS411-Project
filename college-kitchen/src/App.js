import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import React from 'react';
import Home from './home';
import SignIn from './googleSignIn';
import Write from "./components/Write";
import Read from "./components/Read";
import UpdateWrite from "./components/UpdateWrite";
import Pantry from "./pantry";
import FavoriteRecipes from "./favorites";
import Profile from './profile';
import logo from './LOGO1.png';

console.log(logo);

function App() {

  return (
    <div className="App">

  <header>
      <img src={logo} alt="CK"/>
  </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/home" element={<Home />} /> 
          <Route path="/write" element={<Write/>}/>
          <Route path="/read" element={<Read/>}/>
          <Route path="/updatewrite/:firebaseId" element={ <UpdateWrite /> } />
          <Route path="/pantry" element={<Pantry/>}/>
          <Route path="/favorites" element={<FavoriteRecipes/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
