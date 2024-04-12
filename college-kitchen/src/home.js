import React, { useState, useEffect,} from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, set, push } from "firebase/database";
//import { useNavigate } from 'react-router-dom';
import app from "./firebase";
import { getAuth } from "firebase/auth";


function Home() {
  // const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user?.uid;

  const [ingredientArray, setIngredientArray] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `users/${userID}/pantry/ingredients`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const tempArray = Object.keys(myData).map(myFireId => {
        return {
          ...myData[myFireId],
          ingredientId: myFireId
        }
      });
      setIngredientArray(tempArray);
    } else {
      alert("Your pantry is empty! Please add an ingredient using the button below.")
    }
  }

  const toggleFavorite = async (recipeId, e) => {
    const index = favorites.findIndex(recipe => recipe.id === recipeId);
    if (index === -1) {
        const recipeToAdd = recipes.find(recipe => recipe.id === recipeId);
        // Save the favorited recipe to the database
        const isRecipeAlreadyFavorited = await isRecipeFavorited(recipeId);
        if (!isRecipeAlreadyFavorited) {
          try {
            const db = getDatabase(app);
            const favoritesRef = ref(db, `users/${userID}/recipes/favorites`);
            const newFavoriteRef = push(favoritesRef);
            await set(newFavoriteRef, recipeToAdd);
            // Update favorites state
            setFavorites([...favorites, recipeToAdd]);
          } catch (error) {
            console.error('Error saving favorite recipe:', error);
          }
        }
    } else {
        console.log('Recipe already favorited.');
        const newFavorites = favorites.filter(recipe => recipe.id !== recipeId);
        // Remove the favorited recipe from the database
        try {
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
        } catch (error) {
            console.error('Error removing favorite recipe:', error);
        }
    }
};

const isRecipeFavorited = async (recipeId) => {
  try {
      const db = getDatabase(app);
      const favoritesRef = ref(db, `users/${userID}/recipes/favorites`);
      const favoriteSnapshot = await get(favoritesRef);
      if (favoriteSnapshot.exists()) {
          const favoriteData = favoriteSnapshot.val();
          return Object.values(favoriteData).some(recipe => recipe.id === recipeId);
      }
      return false;
  } catch (error) {
      console.error('Error checking if recipe is favorited:', error);
      return false;
  }
};


  const handleSearch = async () => {
    try {
      const allIngredients = [...ingredientArray.map(ingredient => ingredient.ingredientName), ...ingredients.split(',')];
      const ingredientsString = allIngredients.join(',');
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredientsString)}&number=50&sort=max-used-ingredients&apiKey=19d968e0a6084103addc8057885c3dfc`);
      const data = await response.json();
      setTotalPages(Math.ceil(data.length / 10)); // Calculate total pages based on the total number of recipes
      setRecipes(data);
      setSelectedRecipe(null); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1; 

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIngredients(transcript);
    };

    recognition.start();
  };

  const handleRecipeClick = async (recipeId) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=19d968e0a6084103addc8057885c3dfc`);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleGoBack = () => {
    setSelectedRecipe(null);
  };


  return (
    <div className="container">
      <div className="profile">
      <Link to="/profile" className="profile-button">
          <i className="ri-user-line"></i>
        </Link>
      </div>
      <div className="features-container">
        <Link to="/pantry" className="pantry-button">
          <i className="ri-shopping-basket-line"></i>
        </Link>
        <Link to="/favorites" className="favorites-button">
          <i className="ri-heart-line"></i> 
        </Link>
      </div>
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter ingredients..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className='search-button'onClick={handleSearch}><i className="ri-search-line"></i></button>
          <button className="mic-button" onClick={handleSpeech}>
            <i className="ri-mic-line"></i>
          </button>
        </div>
        <div className='recipes'>
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
              <h2>Recipes</h2>
              <div className="grid-container">
              {recipes.slice((currentPage - 1) * 10, currentPage * 10).map(recipe => (
                  <div key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe.id)}>
                    <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} />
                    <p>{recipe.title}</p>
                    
                    <button className='favorites-button' onClick={(event) => { event.stopPropagation(); toggleFavorite(recipe.id); }}>
                          {favorites.some(favorite => favorite.id === recipe.id) ? 
                              <i className="ri-dislike-line"></i> 
                              :
                              <i className="ri-heart-line"></i> 
                          }
                    </button>
                  </div>
                ))}
              </div>
              {recipes.length > 0 && (
              <div className='pagination-container'>
                <div className="pagination">
                  <button className= "more-button" onClick={handlePrevPage} disabled={currentPage === 1}><i class="ri-arrow-left-s-line"></i></button>
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

export default Home;
