import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

const RecipeContextProvider = ({ children, isMain = false }) => {
  const [recipes, setRecipes] = useState([]);

  /* Get Recipes */

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    };

    fetchRecipes();
  }, []);

  /* Add Recipes */

  const addRecipe = async (newRecipe) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const data = await response.json();
      setRecipes([...recipes, data]);
    } catch (error) {
      console.error('Error adding recipe:', error.message);
      throw error;
    }
  };

  /* Update Recipe */

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === id) {
          return { ...recipe, ...updatedRecipe };
        }
        return recipe;
      });

      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error updating recipe:', error.message);
      throw error;
    }
  };

  /* Delete Recipe */

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
      throw error;
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;
