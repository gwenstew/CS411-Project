import React, {useState, useEffect} from 'react';
import app from "./firebase";
import {getDatabase, ref, get, remove} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";


function Pantry() {

  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user?.uid;



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

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className="container">
      <ul>
        {ingredientArray.map((item, index) => (
          <li key={index} className="ingredient-item">
            <div className="ingredient-info">
              <span>
                {item.ingredientName}: {item.ingredientQuantity}
              </span>
              <div className="button-group">
                <button className='update' onClick={() => navigate(`/updatewrite/${item.ingredientId}`)}>
                  <i className="ri-edit-box-line"></i>
                </button>
                <button className='delete' onClick={() => deleteIngredient(item.ingredientId)}>
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className='add-item' onClick={() => navigate("/write")}> Add Item To Pantry </button> 
      <br />
      <br />
      <button className='back-home' onClick={() => navigate("/home")}> Back To Homepage </button> 
    </div>
  )
}

export default Pantry