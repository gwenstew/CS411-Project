import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&sort=max-used-ingredients&apiKey=19d968e0a6084103addc8057885c3dfc`);
      const data = await response.json();
      setRecipes(data);
      setSelectedRecipe(null); 
  } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition(); // Create speech recognition object

    recognition.lang = 'en-US'; 
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1; 

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // get the transcribed text
      setIngredients(transcript); // set the ingredients based on speech input
    };

    recognition.start(); // start speech recognition
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
          <Link to="/pantry" className="pantry-button" >
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
          <button onClick={handleSearch}>Search</button>
          
          
          <button className= "mic-button" onClick={handleSpeech}>
            <i className="ri-mic-line"></i>
          </button>
        </div>
        <div className='recipes'>
          {selectedRecipe ? (
            <div>
              
              <button className="back-button" onClick={handleGoBack}>Recipes</button>

              <h2>{selectedRecipe.title}</h2>
              <img src={selectedRecipe.image} alt={selectedRecipe.title} />
              <h3>Ingredients:</h3>
              <ul>
                {selectedRecipe.extendedIngredients.map(ingredient => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
              </div>

          
          ) : (
            <div>
              <h2>Recipes</h2>
              <div className="grid-container">
                {recipes.map(recipe => (
                  <div key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe.id)}>
                    <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} />
                    <p>{recipe.title}</p>
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
