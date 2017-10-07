export interface RecipeBase {
  name: string;
  tags: string[];
  ingredients: string[];
  instructions: string;
}

export interface Recipe extends RecipeBase {
  id: string;
  ownerId: string;
}
