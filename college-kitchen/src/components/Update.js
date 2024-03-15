import React, {useState} from 'react';
import app from "../firebase";
import {getDatabase, ref, get, remove} from "firebase/database";
import { useNavigate } from 'react-router-dom';


function Update() {

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






/*
const {firebaseId} = useParams();

    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "pantry/ingredients/"+firebaseId);
            const snapshot = await get(dbRef);
            if(snapshot.exists()) {
              const targetObject = snapshot.val();
              setInputValue1(targetObject.ingredientName);
              setInputValue2(targetObject.ingredientQuantity);
            } else {
              alert("error");
            }
        }
        fetchData();
    }, [firebaseId])
    

    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "pantry/ingredients/"+firebaseId);
        set(newDocRef, {
            ingredientName: inputValue1,
            ingredientQuantity: inputValue2
        }).then( () => {
            alert("data updated successfully")
        }).catch((error) => {
            alert("error: ", error.message);
        })
        
    }


    return (
        <div>

        <h1>UPDATE</h1>

        <input type='text' value={inputValue1} 
        onChange={(e) => setInputValue1(e.target.value)}/> 

        <input type='text' value={inputValue2} 
        onChange={(e) => setInputValue2(e.target.value)}/> <br/>

        <button onClick={overwriteData}>UPDATE</button>
      
    </div>
    )
*/