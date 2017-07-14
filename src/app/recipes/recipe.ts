export interface Recipe {
  $key: string;
  owner_id: string;
  name: string;
  tags: string[];
  time: number;
  ingredients: string[];
  instructions: string;
}
