import React, { useState, useEffect,} from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get} from "firebase/database";
// import { useNavigate } from 'react-router-dom';
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


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSearch = async () => {
    try {
      const allIngredients = [...ingredientArray.map(ingredient => ingredient.ingredientName), ...ingredients.split(',')];
      const ingredientsString = allIngredients.join(',');
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredientsString)}&number=10&sort=max-used-ingredients&apiKey=19d968e0a6084103addc8057885c3dfc`);
      const data = await response.json();
      setRecipes(data);
      setSelectedRecipe(null); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
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

  const toggleFavorite = (recipeId, e) => {

    const index = favorites.findIndex(recipe => recipe.id === recipeId);
    if (index === -1) {
      const recipeToAdd = recipes.find(recipe => recipe.id === recipeId);
      setFavorites([...favorites, recipeToAdd]);
    } else {
      const newFavorites = favorites.filter(recipe => recipe.id !== recipeId);
      setFavorites(newFavorites);
    }
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
          />
          <button onClick={handleSearch}><i className="ri-search-line"></i></button>
          <button className="mic-button" onClick={handleSpeech}>
            <i className="ri-mic-line"></i>
          </button>
        </div>
        <div className='recipes'>
          {selectedRecipe ? (
            <div>
              <button className="back-button" onClick={handleGoBack}>Recipes</button>
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
                {recipes.map(recipe => (
                  <div key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe.id)}>
                    <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} />
                    <p>{recipe.title}</p>
                    
                    <Link to={{ pathname: "/favorites", state: { favorites: favorites || [] } }} className="favorites-button">
                    <i className="ri-heart-line"></i>
                    </Link>
                    <button className='favorites-button' onClick={(event) => { event.stopPropagation(); toggleFavorite(recipe.id); }}>
                          {favorites.some(favorite => favorite.id === recipe.id) ? 
                              <i class="ri-dislike-line"></i> 
                              :
                              <i className="ri-heart-line"></i> 
                          }
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
