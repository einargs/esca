import {Observable }            from "rxjs/Observable";

import { Injectable }           from "@angular/core";
import { AngularFireDatabase }  from "angularfire2/database";
import { AngularFireAuth }      from 'angularfire2/auth';
import * as firebase            from 'firebase/app';

import { UserService }          from "../user/user.service";
import { Recipe }               from "./recipe";

@Injectable()
export class RecipeService {
  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.db.list("/recipe");
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.db.object(`/recipe/${id}`);
  }

  // Create a brand-new recipe
  async newRecipe(): Promise<string> {
    if (!this.userService.signedIn)
      throw Error("User not logged in");

    let uid = await this.userService.getUserId();

    return this.db.list("/recipe").push(new Recipe(uid)).key;
  }

  // Delete a recipe
  async deleteRecipe(id: string): Promise<void> {
    if (!id) throw Error("Must pass id for deletion");

    await this.db.list("/recipe").remove(id);
  }


  // Add an ingredient to a recipe
  // Here because the recipe class works more as an interface than a class
  addIngredientTo(recipe: Recipe, ingredient: string): void {
    // Ensure there is a recipe and an ingredient
    if (recipe && ingredient)
      // If the ingredients field does exist
      if (recipe.ingredients)
        // Store the ingredient in a set-like fashion
        recipe.ingredients[ingredient] = true;
      // If the ingredients field doesn't exist
      else
        // Set it to an object with the ingredient already stored
        recipe.ingredients = { [ingredient]: true };
  }

  // Delete an ingredient from a recipe
  // Here because the recipe class works more as an interface than a class
  deleteIngredientFrom(recipe: Recipe, ingredient: string): void {
    // Ensure there is a recipe and an ingredient
    if (recipe && ingredient)
      // Ensure the ingredients field exists
      if (recipe.ingredients)
        // Delete the ingredient
        delete recipe.ingredients[ingredient];
        // It doesn't matter if the ingredient didn't exist
  }
}
