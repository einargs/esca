export interface Recipe {
  $key: string;
  owner_id: string;
  name: string;
  tags: string[];
  time: string;
  ingredients: string[];
  instructions: string;
}
