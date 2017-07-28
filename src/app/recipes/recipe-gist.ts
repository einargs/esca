import { Recipe } from "./recipe";

// Recipe gist interface
export interface RecipeGist {
  id: string;
  ownerId: string;
  name: string;
  time: number;
  tags: string[];
  ingredients: string[];
}

// Create a gist from a recipe
function buildGist(recipe: Recipe): RecipeGist {
  return {
    id: recipe.id,
    ownerId: recipe.ownerId,
    name: recipe.name,
    time: recipe.time,
    tags: Array.from(recipe.tags),
    ingredients: Array.from(recipe.ingredients)
  };
}

export const recipeGistUtil = {
  buildGist
};
