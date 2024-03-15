import React, {useState, useEffect} from 'react';
import app from "./firebase";
import {getDatabase, ref, get, remove} from "firebase/database";
import { useNavigate } from 'react-router-dom';


function Pantry() {

  const navigate = useNavigate();
  let [ingredientArray, setIngredientArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "pantry/ingredients");
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
    const dbRef = ref(db, "pantry/ingredients/"+ingredientIdParam);
    await remove(dbRef);
    window.location.reload();
  }

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div>
        <ul>
            {ingredientArray.map((item, index) => (
                <li key={index}>
                    {item.ingredientName}: {item.ingredientQuantity}
                    <button className='button1' onClick={ () => navigate(`/updatewrite/${item.ingredientId}`)}>UPDATE</button>
                    <button className='button1' onClick={ () => deleteIngredient(item.ingredientId)}>DELETE</button>
                </li>
            ))}
        </ul>
        <button className='button1' onClick={ () => navigate("/write")}> Add Item To Pantry </button> 
        <br />
        <br />
        <button className='button1' onClick={ () => navigate("/home")}> Back To Homepage </button> 
    </div>
  )
}

export default Pantry