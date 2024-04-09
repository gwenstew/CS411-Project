import React, {useState} from 'react';
import app from "../firebase";
import {getDatabase, ref, set, push} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function Write() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user?.uid;

  const navigate = useNavigate();
  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");

  const saveData = async() => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db,`users/${userID}/pantry/ingredients`))
    set (newDocRef,{
      ingredientName: inputValue1,
      ingredientQuantity: inputValue2
    }).then(() => {
      alert("Sucess! Ingredient stored")
    }).catch((error) => {
      alert("Error: ", error.message);
    })
  }

  return (
    <div>
      <button className='back-home' onClick={() => navigate("/home")}>< i class="ri-home-2-line"></i>
      </button> 
       <h1> Store Ingredient </h1>
      <div className="input-container">
        <input type='text' 
        className="updatebox1" 
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
        placeholder="Enter ingredient"/>
        
        <input type='text' 
        className="updatebox2" 
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        placeholder="Enter quantity"/>
            <button className= 'store-button' onClick = {saveData} >< i class="ri-check-line"></i></button>

      </div>
      <br />
      <br />
      <button className='back-pantry-button' onClick={ () => navigate("/pantry")}><i className="ri-shopping-basket-line"></i> </button>
      </div>
  )
}

export default Write