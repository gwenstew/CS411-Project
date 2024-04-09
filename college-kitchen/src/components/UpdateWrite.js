import React, {useState, useEffect} from 'react';
import app from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";


function UpdateWrite() {

  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user?.uid;

  const navigate = useNavigate();
  const {firebaseId} = useParams();

    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, `users/${userID}/pantry/ingredients/`+firebaseId);
            const snapshot = await get(dbRef);
            if(snapshot.exists()) {
              const targetObject = snapshot.val();
              setInputValue1(targetObject.ingredientName);
              setInputValue2(targetObject.ingredientQuantity);
            } else {
              alert("Error");
            }
        }
        fetchData();
    }, [firebaseId])
    

    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, `users/${userID}/pantry/ingredients/`+firebaseId);
        set(newDocRef, {
            ingredientName: inputValue1,
            ingredientQuantity: inputValue2
        }).then( () => {
            alert("Sucess! Ingredient Updated")
        }).catch((error) => {
            alert("Error: ", error.message);
        })
        
    }


    return (
        <div>

        <h1>Update Ingredient</h1>
        <div className="input-container">
            <input type='text' className="updatebox1" value={inputValue1} 
            onChange={(e) => setInputValue1(e.target.value)}/> 

            <input type='text' className="updatebox2" value={inputValue2} 
            onChange={(e) => setInputValue2(e.target.value)}/> <br/>
        </div>
        <button className='update' onClick={overwriteData}>UPDATE</button>
        <br />
        <br />
        <button className='back-pantry-button' onClick={ () => navigate("/pantry")}><i className="ri-shopping-basket-line"></i></button>
    </div>
    )
}


export default UpdateWrite