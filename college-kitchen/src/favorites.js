import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function FavoriteRecipes() {
    const navigate = useNavigate();
    const [recipeArray, setRecipeArray] = useState([]);

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

    }
    // deletes a recipe
    const deleteRecipe = async (recipeIdParam) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "recipes/favorites/" + recipeIdParam);
        await remove(dbRef);
        window.location.reload();
    }

    return (
        <div className="container">
            <h2>Favorite Recipes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipeArray.map((recipe, index) => (
                        <tr key={index}>
                            <td>{recipe.recipeName}</td>
                            <td>{recipe.ingredients}</td>
                            <td>{recipe.instructions}</td>
                            <td>
                                <button className='delete' onClick={() => deleteRecipe(recipe.recipeId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='add-recipe' onClick={() => navigate("/add-recipe")}>Add Recipe</button>
            <br />
            <br />
            <button className='back-home' onClick={() => navigate("/home")}>Back To Homepage</button>
        </div>
    );

export default FavoriteRecipes;

