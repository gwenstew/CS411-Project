import React, {useState, useEffect} from 'react';
import app from "./firebase";
import {getDatabase, ref, get, remove} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';

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
        alert("Your pantry is empty! Please add an ingredient using the button below.")
    }
  }

  const deleteIngredient = async (ingredientIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `users/${userID}/pantry/ingredients/`+ingredientIdParam);
    await remove(dbRef);
    fetchData();
    //window.location.reload();
  }

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className="container">
      <button className='back-home' onClick={() => navigate("/home")}>< i class="ri-home-2-line"></i>
            </button>
      <div className="features-container">
      <Link to="/favorites" className="favorites-button">
          <i className="ri-heart-line"></i> 
        </Link>
            </div>
      <h1> Pantry </h1>
      <button className='add-item' onClick={() => navigate("/write")}>ADD INGREDIENT  < i class="ri-add-line"></i>
      </button> 
      <button className='back-home' onClick={() => navigate("/home")}>< i class="ri-home-2-line"></i>
      </button> 
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
      
    </div>
  )
}

export default Pantry