import React, { useState, useEffect } from 'react';
import app from "./firebase";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function FavoriteRecipes() {
    const navigate = useNavigate();
    const [recipeArray, setRecipeArray] = useState([]);

}