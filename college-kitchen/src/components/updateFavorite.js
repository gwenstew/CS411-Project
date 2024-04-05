import React, { useState, useEffect} from 'react';
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, push} from "firebase/database";
import { useNavigate } from 'react-router-dom';

function updateFavorite({recipeId}) {
    const auth = getAuth();
    const user = auth.currentUser;
    const userID = user?.uid;

    const toggleFav = async() => {
        const db = getDatabase(app);
        const favoritesRef = push(ref(db, 'users/${userID}/favorites'))
        const favoriteSnapshot = await get(favoritesRef);

        if (favoriteSnapshot.exists()) {
            // Check if the recipe is already in favorites
            const favoriteRecipes = favoriteSnapshot.val();
            const isFavorite = favoriteRecipes.hasOwnProperty(recipeId);
        
            if (isFavorite) {
              // Recipe is already in favorites, remove it
              const updatedFavorites = { ...favoriteRecipes };
              delete updatedFavorites[recipeId];
              set(favoritesRef, updatedFavorites)
                .then(() => {
                  alert("Success! Recipe removed from favorites");
                })
                .catch((error) => {
                  alert("Error removing recipe from favorites: " + error.message);
                });
            } else {
              // Recipe is not in favorites, add it
              set(favoritesRef.child(recipeId), true)
                .then(() => {
                  alert("Success! Recipe added to favorites");
                })
                .catch((error) => {
                  alert("Error adding recipe to favorites: " + error.message);
                });
            }
          } else {
            // Favorites node doesn't exist, create it and add the recipe
            const newFavorites = { [recipeId]: true };
            set(favoritesRef, newFavorites)
              .then(() => {
                alert("Success! Recipe added to favorites");
              })
              .catch((error) => {
                alert("Error adding recipe to favorites: " + error.message);
              });
          }
    }
    return (
        <button className="favorites-button" onClick={toggleFav}>
            <i className="ri-heart-line"></i>
        </button>
    );
};

export default updateFavorite;