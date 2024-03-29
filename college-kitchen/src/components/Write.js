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
      <input type='text' value={inputValue1}
      onChange={(e) => setInputValue1(e.target.value)}/>
      <input type='text' value={inputValue2}
      onChange={(e) => setInputValue2(e.target.value)}/>

      <button className= 'store-button' onClick = {saveData} >Store ingredient</button>
      <br />
      <br />
      <button className='back-pantry' onClick={ () => navigate("/pantry")}> Back To Pantry </button>

    </div>
  )
}

export default Write