interface RecipeInfo {
  [key: string]: string;
}

export interface Recipe {
  id: string;
  ownerId: string;
  name: string;
  info: RecipeInfo;
  tags: string[];
  ingredients: string[];
  instructions: string;
}
