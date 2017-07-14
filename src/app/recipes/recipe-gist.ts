import { Recipe } from "./recipe";

// Recipe gist interface
export interface RecipeGist {
  $key: string;
  owner_id: string;
  name: string;
  tags: string[];
  time: number;
  ingredients: string[];
}
