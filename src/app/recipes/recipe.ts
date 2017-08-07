export interface Recipe {
  id: string;
  ownerId: string;
  name: string;
  time: number;
  tags: string[];
  ingredients: string[];
  instructions: string;
}
