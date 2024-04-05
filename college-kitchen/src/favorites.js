import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';

function FavoriteRecipes() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    // const [recipeArray, setRecipeArray] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, `users/${userID}/recipes/favorites`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const favoriteRecipes = Object.values(snapshot.val()).map(myFireId => {
                return {
                  ...snapshot.val([myFireId]),
                  favoriteId: myFireId
                }
              });
            setFavorites(favoriteRecipes);
        } else {
            alert("Error, couldn't retrieve favorite recipes");
        }
    }
        


    // deletes a recipe
    const deleteRecipe = async (recipeIdParam) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "recipes/favorites/" + recipeIdParam);
        await remove(dbRef.child(recipeIdParam));
        setFavorites(favorites.filter(recipe => recipe.id !== recipeIdParam));
        window.location.reload();
    }

    return (
        <div className="container">
            <h2>Favorite Recipes</h2>
            <div className="favorites-list">
                    {favorites.map((recipe, index) => (
                        <div key={recipe.id} className="favorite-item">
                        <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} />
                        <p>{recipe.title}</p>
                        
                        <button className='favorites-button'>
                              {favorites.some(favorite => favorite.id === recipe.id) ? 
                                  <i class="ri-dislike-line"></i> 
                                  :
                                  <i className="ri-heart-line"></i> 
                              }
                        </button>
                      </div>
                    ))}
            </div>
            <button className='back-home' onClick={() => navigate("/home")}>Back To Homepage</button>
        </div>
    );

}
export default FavoriteRecipes;
