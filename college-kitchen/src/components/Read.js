import React, {useState} from 'react';
import app from "../firebase";
import {getDatabase, ref, get} from "firebase/database";



function Read() {

  let [ingredientArray, setIngredientArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "pantry/ingredients");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        setIngredientArray(Object.values(snapshot.val()));
    } else {
        alert("Error, couldn't retrieve pantry")
    }
  }
  return (
    <div>
        <button onClick = {fetchData}> Show Pantry </button>
        <ul>
            {ingredientArray.map((item, index) => (
                <li key={index}>
                    {item.ingredientName}: {item.ingredientQuantity}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Read