import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const IndiRecipePage = () => {
  const { id } = useParams();
  const { recipes, deleteRecipe } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  // Find the recipe to display based on the ID
  useEffect(() => {
    const selectedRecipe = recipes.find((recipe) => recipe.id === id);
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [id, recipes]);

  // Deleting a Recipe
  const onDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      try {
        await deleteRecipe(id);
        toast.success('Recipe deleted successfully');
        navigate('/recipes');
      } catch (error) {
        console.error('Error deleting recipe:', error.message);
        toast.error('Failed to delete recipe');
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-lightrose">
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/recipes" className="text-brown hover:darkerrose flex items-center">
            <FaArrowLeft className="mr-2 text-brown" />
          </Link>
        </div>
      </section>

      <section>
        <div className="container m-auto py-10 px-6">
          {/* Name Infos */}
          <div className="grid grid-cols-1 md:grid-cols-30/70 w-full gap-6">
            <div className="bg-cwhite p-6 rounded-lg shadow-md ">
              <h1 className="text-3xl text-brown font-bold mb-4">{recipe.name}</h1>
              <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                <p className="text-orange-700">Estimated Time Prepared: {recipe.timeprepared}</p>
              </div>

              <p className="text-orange-700 mt-8">{recipe.description}</p>

              <hr className="my-4" />
              <h3 className="text-xl font-bold mb-6 mt-10 text-brown">Manage Recipe</h3>

              <Link
                to={`/editrecipe/${recipe.id}`}
                className="bg-darkerrose hover:bg-lightrose text-white text-center  py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Edit Recipe
              </Link>

              <button
                onClick={() => onDeleteClick(recipe.id)}
                className="bg-darkerrose hover:bg-lightrose text-white  py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Recipe
              </button>
            </div>

            {/* Recipe Infos*/}
            <div className="ml-6 mb-10">
              <div className="bg-cwhite p-6 rounded-lg shadow-md ">
                <h3 className="text-brown text-lg font-bold mb-6">Ingredients</h3>

                <ul className="list-disc ml-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-2">
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <h3 className="text-brown text-lg font-bold mb-2">Instructions</h3>

                <ol className="list-decimal ml-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndiRecipePage;