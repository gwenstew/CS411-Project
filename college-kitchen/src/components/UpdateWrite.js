import React, {useState, useEffect} from 'react';
import app from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateWrite() {

  const navigate = useNavigate();
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
}


export default UpdateWrite