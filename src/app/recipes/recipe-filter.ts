import { Recipe } from "./recipe";
import { RecipeGist } from "./recipe-gist";

// The recipe filter interface
export interface RecipeFilter {
  nameIncludes?: string;
  hasTags?: string[];
  hasIngredients?: string[];
  timeLessThan?: number;
  timeMoreThan?: number;
}

// The filter function
export function applyFilter(
  filter: RecipeFilter, recipes: RecipeGist[]
): RecipeGist[] {
  return recipes.filter(recipe => (
    !filter.timeMoreThan || (+recipe.time > filter.timeMoreThan)
  ) && (
    !filter.timeLessThan || (+recipe.time < filter.timeLessThan)
  ) && (
    !filter.nameIncludes || (recipe.name.includes(filter.nameIncludes))
  ) && (
    !filter.hasTags || (recipe.tags &&
      filter.hasTags.every(tag => recipe.tags.includes(tag)))
  ) && (
    !filter.hasIngredients || (recipe.ingredients &&
      filter.hasIngredients.every(ing => recipe.ingredients.includes(ing)))
  ));
}
