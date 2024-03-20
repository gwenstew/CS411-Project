import React, {useState} from 'react';
import app from "../firebase";
import {getDatabase, ref, get, remove} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function Update() {

  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user.uid;

  const navigate = useNavigate();
  let [ingredientArray, setIngredientArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `users/${userID}/pantry/ingredients`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {

        const myData = snapshot.val();
        const tempArray = Object.keys(myData).map( myFireId => {
            return {
                ...myData[myFireId],
                ingredientId: myFireId
            }
        });

        setIngredientArray(tempArray);
    } else {
        alert("Error, couldn't retrieve pantry")
    }
  }

  const deleteIngredient = async (ingredientIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `users/${userID}/pantry/ingredients/`+ingredientIdParam);
    await remove(dbRef);
    window.location.reload();
  }
  return (
    <div>
        <button onClick = {fetchData}> Show Pantry </button>
        <ul>
            {ingredientArray.map((item, index) => (
                <li key={index}>
                    {item.ingredientName}: {item.ingredientQuantity}
                    <button className='button1' onClick={ () => navigate(`/updatewrite/${item.ingredientId}`)}>UPDATE</button>
                    <button className='button1' onClick={ () => deleteIngredient(item.ingredientId)}>DELETE</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Update