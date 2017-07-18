export interface Recipe {
  $key: string;
  owner_id: string;
  name: string;
  tags: string[];
  time: number;
  ingredients: string[];
  instructions: string;
}

//TODO:Re-do how I handle tags and ingredients so these aren't necessary
export const recipeUtil = {
  // Add an ingredient to a recipe
  addIngredientTo(recipe: Recipe, ingredient: string): void {
    // Ensure there is a recipe and an ingredient
    if (recipe && ingredient)
      // If the ingredients field does exist
      if (recipe.ingredients)
        // Push the ingredient on
        recipe.ingredients.push(ingredient);
      // If the ingredients field doesn't exist
      else
        // Set it to an array with the ingredient already stored
        recipe.ingredients = [ingredient];
  },

  // Delete an ingredient from a recipe
  deleteIngredientFrom(recipe: Recipe, ingredient: string): void {
    // Ensure there is a recipe and an ingredient
    if (recipe && ingredient)
      // Ensure the ingredients field exists
      if (recipe.ingredients) {
        // Find the index of the ingredient
        let i = recipe.ingredients.indexOf(ingredient);
        // If the ingredient exists (i.e., the index isn't -1)
        if (i !== -1)
          // Delete the ingredient
          recipe.ingredients.splice(i, 1);
      }
  },

  // Add a tag to a recipe
  addTagTo(recipe: Recipe, tag: string): void {
    if (recipe && tag)
      if (recipe.tags)
        recipe.tags.push(tag);
      else
        recipe.tags = [tag];
  },

  // Remove a tag from a recipe
  deleteTagFrom(recipe: Recipe, tag: string): void {
    if (recipe && tag && recipe.tags) {
      let i = recipe.tags.indexOf(tag);

      if (i !== -1) recipe.tags.splice(i, 1);
    }
  }
};
