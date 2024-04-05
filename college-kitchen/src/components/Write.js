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
      </div>
      <button className= 'store-button' onClick = {saveData} > STORE INGREDIENT </button>
      <br />
      <br />
      <button className='back-pantry' onClick={ () => navigate("/pantry")}><i className="ri-shopping-basket-line"></i> </button>

    </div>
  )
}

export default Write