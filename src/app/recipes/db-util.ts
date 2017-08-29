import { Recipe }     from "./recipe";
import { RecipeGist } from "./recipe-gist";

// Inverted Array
interface InvertedStringArray {
  [key: string]: number;
}

function fromInverted(target: InvertedStringArray): string[] {
  let result = [];
  for (let v in target) {
      let k = target[v];
      result[k] = v;
  }
  return result;
}

function toInverted(target: string[]): InvertedStringArray {
  let result = {};
  for (let k in target) {
    let v = target[k];
    result[v] = k;
  }
  return result;
}


interface Keyed {
  $key: string;
}


// Server Recipe
interface ServerRecipe {
  ownerId: string;
  name: string;
  tags: InvertedStringArray;
  info: {[key: string]: string};
  ingredients: InvertedStringArray;
  instructions: string;
}

export function buildServerRecipe(recipe: Recipe): ServerRecipe {
  return {
    ownerId: recipe.ownerId,
    name: recipe.name,
    info: {...recipe.info},
    tags: recipe.tags ? toInverted(recipe.tags) : undefined,
    ingredients: recipe.ingredients ? toInverted(recipe.ingredients) : undefined,
    instructions: recipe.instructions
  };
}

export function buildRecipe(serverRecipe: Keyed & ServerRecipe): Recipe {
  return {
    id: serverRecipe.$key,
    ownerId: serverRecipe.ownerId,
    name: serverRecipe.name,
    info: {...serverRecipe.info},
    tags: serverRecipe.tags ? fromInverted(serverRecipe.tags) : [],
    ingredients: serverRecipe.ingredients ? fromInverted(serverRecipe.ingredients) : [],
    instructions: serverRecipe.instructions
  };
}


// Server Recipe Gist
interface ServerRecipeGist {
  ownerId: string;
  name: string;
  tags: InvertedStringArray;
  ingredients: InvertedStringArray;
}

export function buildServerGist(gist: RecipeGist): ServerRecipeGist {
  return {
    ownerId: gist.ownerId,
    name: gist.name,
    tags: gist.tags ? toInverted(gist.tags) : undefined,
    ingredients: gist.ingredients ? toInverted(gist.ingredients) : undefined
  };
}

export function buildGist(serverGist: Keyed & ServerRecipeGist): RecipeGist {
  return {
    id: serverGist.$key,
    ownerId: serverGist.ownerId,
    name: serverGist.name,
    tags: serverGist.tags ? fromInverted(serverGist.tags) : [],
    ingredients: serverGist.ingredients ? fromInverted(serverGist.ingredients) : []
  };
}
