import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';
import UpdateFavorite from './components/updateFavorite';

function FavoriteRecipes() {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const userID = user?.uid;
    const [favorites, setFavorites] = useState([]);
    // const [recipeArray, setRecipeArray] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try{
            const db = getDatabase(app);
            const dbRef = ref(db, `users/${userID}/recipes/favorites`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const favoritesData = snapshot.val();
                const favoriteRecipes = Object.keys(favoritesData).map(recipeId => ({
                    id: recipeId,
                    ...favoritesData[recipeId]
                }));
                setFavorites(favoriteRecipes);
            } else {
                setFavorites([]);
                console.log("No favorite recipes found");
            }
        } catch (error){
            console.log("Error fetching favorite recipes:", error);
        }
    }
        


    // deletes a recipe
    const deleteRecipe = async (recipeIdParam) => {
        try{
            const db = getDatabase(app);
            const dbRef = ref(db, `users/${userID}/recipes/favorites/${recipeIdParam}`);
            await remove(dbRef);
            setFavorites(favorites.filter(recipe => recipe.id !== recipeIdParam));
            console.log("Recipe deleted successfully");
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    }

    return (
        <div className="container">
            <h2>Favorite Recipes</h2>
            <div className="favorites-list">
                {favorites.map((recipe, index) => (
                    <div key={recipe.id} className="favorite-item">
                        <Link to={`/recipe/${recipe.id}`}>
                            <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} />
                        </Link>
                        <UpdateFavorite recipeId={recipe.id} />
                        <button className='delete' onClick={() => deleteRecipe(recipe.id)}>Remove from Favorites</button>
                    </div>
                ))}
            </div>
            <button className='back-home' onClick={() => navigate("/home")}>Back To Homepage</button>
        </div>
    );

}
export default FavoriteRecipes;
