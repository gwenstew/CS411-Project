import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';
//import UpdateFavorite from './components/updateFavorite';

function Favorites() {
    
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const userID = user ? user.uid : null;
    const [favorites, setFavorites] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    //const userID = user?.uid;
    // const [recipeArray, setRecipeArray] = useState([]);
    // const [ingredientArray, setIngredientArray] = useState([]);
    // const [ingredients, setIngredients] = useState('');

    useEffect(() => {
        if (userID) {
            fetchData();
        }
    }, [userID]);

    const fetchData = async () => {
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
            //setFavorites([]);
            alert("No favorite recipes found");
        }
    }
        
    // deletes a recipe
    const deleteRecipe = async (recipeId) => {
        const newFavorites = favorites.filter(recipe => recipe.id !== recipeId);
        // Remove the favorited recipe from the database
        const db = getDatabase(app);
        const favoritesRef = ref(db, `users/${userID}/recipes/favorites`);
        const favoriteSnapshot = await get(favoritesRef);
        if (favoriteSnapshot.exists()) {
            const favoriteData = favoriteSnapshot.val();
            const favoriteKey = Object.keys(favoriteData).find(key => favoriteData[key].id === recipeId);
            if (favoriteKey) {
                const favoriteRecipeRef = ref(db, `users/${userID}/recipes/favorites/${favoriteKey}`);
                await set(favoriteRecipeRef, null);
        }
        }
        // Update favorites state
        setFavorites(newFavorites);
        console.log("Recipe deleted successfully");
    }


    const handleRecipeClick = async (recipeId) => {
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=19d968e0a6084103addc8057885c3dfc`);
          const data = await response.json();
          setSelectedRecipe(data);
        } catch (error) {
          console.error('Error fetching recipe details:', error);
        }
      };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };
    
    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleGoBack = () => {
        setSelectedRecipe(null);
    };


    return (
        <div className="container">
            <button className='back-home' onClick={() => navigate("/home")}>< i class="ri-home-2-line"></i>
            </button>
            <div className="profile">
                <Link to="/profile" className="profile-button">
                    <i className="ri-user-line"></i>
                </Link>
            </div>
            <div className="features-container">
                <Link to="/pantry" className="pantry-button">
                    <i className="ri-shopping-basket-line"></i>
                </Link>
            </div>
            <div className="content">
                <div className='favorite-recipes'>
                    {selectedRecipe ? (
                        <div>
                            <button className="back-button" onClick={handleGoBack}><i class="ri-arrow-left-s-line"></i></button>
                            <h2>{selectedRecipe.title}</h2>
                            <img src={selectedRecipe.image} alt={selectedRecipe.title}/>
              
                            <div className='ingredients-container'>
                            <h3>Ingredients:</h3>
                            <ul>
                                {selectedRecipe.extendedIngredients.map(ingredient => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                            </div>

                            <div className='instructions'>
                                <h3>Instructions:</h3>
                                <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2>Favorite Recipes</h2>
                            <div className="grid-container">
                            {favorites.slice((currentPage - 1) * 10, currentPage * 10).map(recipe => (
                                <div key={recipe.id} className="favorite-item" onClick={() => handleRecipeClick(recipe.id)}>
                                    <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} />
                                    <p>{recipe.title}</p>
                                
                            <button className='delete-favorite-button' onClick={(e) => { e.stopPropagation(); deleteRecipe(recipe.id); }}>
                            <i className="ri-dislike-line"></i>
                            </button>

                                </div>
                            ))}
                            </div>
                            {recipes.length > 0 && (
                                <div className='pagination-container'>
                                    <div className="pagination">
                                        <button className= "less-button" onClick={handlePrevPage} disabled={currentPage === 1}><i class="ri-arrow-left-s-line"></i></button>
                                        <button className= "more-button" onClick={handleNextPage} disabled={currentPage === totalPages}><i class="ri-arrow-right-s-line"></i></button>
                                    </div>
                                <div className="page-number">Page {currentPage} of {totalPages}</div>
                            </div>
                            )}
                        </div> 
                    )}
                </div>
            </div>
        </div>
    );
}

export default Favorites
