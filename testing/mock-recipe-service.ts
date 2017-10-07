import { RecipeService } from "../src/app/recipes/recipe.service";

export function mockRecipeService(configure?: (mockService: any) => void) {
  let mockService = jasmine.createSpyObj("recipeService", [
    "getFilteredRecipes",
    "getRecipe",
    "newRecipe",
    "deleteRecipe",
    "saveRecipe"
  ]);

  if (configure) configure(mockService);

  return { provide: RecipeService, useValue: mockService };
}
