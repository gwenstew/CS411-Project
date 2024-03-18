import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function FavoriteRecipes() {
    const navigate = useNavigate();
    const [recipeArray, setRecipeArray] = useState([]);

    // fetch data from Firebase
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "recipes/favorites");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const myData = snapshot.val();
            const tempArray = Object.keys(myData).map(myFireId => {
                return {
                    ...myData[myFireId],
                    recipeId: myFireId
                }
            });
            setRecipeArray(tempArray);
        } else {
            alert("Error, couldn't retrieve favorite recipes");
        }

    }


}