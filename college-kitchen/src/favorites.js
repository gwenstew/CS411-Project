import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';

function FavoriteRecipes() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    // const [recipeArray, setRecipeArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const db = getDatabase(app);
          const dbRef = ref(db, "recipes/favorites");
          const snapshot = await get(dbRef);
          if (snapshot.exists()) {
            const favoriteRecipes = Object.values(snapshot.val());
            setFavorites(favoriteRecipes);
          } else {
            alert("Error, couldn't retrieve favorite recipes");
          }
        };
        fetchData();
      }, []);

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
                        <tr key={index}>
                            <td>{recipe.recipeName}</td>
                            <td>{recipe.ingredients}</td>
                            <td>{recipe.instructions}</td>
                            <td>
                                <button className='add-recipe' onClick={() => navigate("/add-recipe")}>Add Recipe</button>
                                <br />
                                <button className='delete' onClick={() => deleteRecipe(recipe.recipeIdParam)}>Delete</button>
                            </td>
                        </tr>
                    ))}
            <button className='back-home' onClick={() => navigate("/home")}>Back To Homepage</button>
        </div>
    );

}

export default FavoriteRecipes;

