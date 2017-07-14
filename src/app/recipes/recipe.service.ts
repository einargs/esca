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

  getUserRecipes(userId: string): Observable<Recipe[]> {
    return this.db.list("/recipe", {
      query: {
        orderByChild: "owner_id",
        equalTo: userId
      }
    });
  }

  getCurrentUserRecipes(): Observable<Recipe[]> {
    return this.db.list("/recipe", {
      query: {
        orderByChild: "owner_id",
        equalTo: this.userService.userIdSubject
      }
    });
  }

  // Filter a passed stream of recipes on what tags they have
  filterForTags(
    recipes: Observable<Recipe[]>, tags: string[]
  ): Observable<Recipe[]> {
    return recipes.map(
      recipes => recipes.filter(
        recipe => recipe.tags && tags.every(
          tag => recipe.tags.includes(tag)
        )
      )
    );
  }

  // Get
  getUserRecipesTagged(
    userId: string, tags: string[]
  ): Observable<Recipe[]> {
    return this.filterForTags(this.getUserRecipes(userId), tags);
  }

  // Get
  getCurrentUserRecipesTagged(
    tags: string[]
  ): Observable<Recipe[]> {
    return this.filterForTags(this.getCurrentUserRecipes(), tags);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.db.object(`/recipe/${id}`);
  }

  // Create a brand-new recipe
  async newRecipe(): Promise<string> {
    let uid = this.userService.userId;

    if (!uid) throw Error("User not logged in");

    return this.db.list("/recipe").push({
      owner_id: uid,
      name: "",
      tags: [],
      time: 0,
      ingredients: [],
      instructions: []
    }).key;
  }

  // Delete a recipe
  async deleteRecipe(id: string): Promise<void> {
    if (!id) throw Error("Must pass id for deletion");

    await this.db.list("/recipe").remove(id);
  }

  // Save a recipe
  async saveRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass recipe to be saved");

    let {
      $key, owner_id="", name="", time=0,
      ingredients=[], instructions=""
    } = recipe;

    await this.db.object(`/recipe/${$key}`).update({
      owner_id, name, time, ingredients, instructions
    });
  }


  // Add an ingredient to a recipe
  // Here because the recipe class works more as an interface than a class
  addIngredientTo(recipe: Recipe, ingredient: string): void {
    // Ensure there is a recipe and an ingredient
    if (recipe && ingredient)
      // If the ingredients field does exist
      if (recipe.ingredients)
        // Push the ingredient on
        recipe.ingredients.push(ingredient);
      // If the ingredients field doesn't exist
      else
        // Set it to an array with the ingredient already stored
        recipe.ingredients = [ingredient];
  }

  // Delete an ingredient from a recipe
  // Here because the recipe class works more as an interface than a class
  deleteIngredientFrom(recipe: Recipe, ingredient: string): void {
    // Ensure there is a recipe and an ingredient
    if (recipe && ingredient)
      // Ensure the ingredients field exists
      if (recipe.ingredients) {
        // Find the index of the ingredient
        let i = recipe.ingredients.indexOf(ingredient);
        // If the ingredient exists (i.e., the index isn't -1)
        if (i !== -1)
          // Delete the ingredient
          recipe.ingredients.splice(i, 1);
      }
  }


  // Add a tag to a recipe
  addTagTo(recipe: Recipe, tag: string): void {
    if (recipe && tag)
      if (recipe.tags)
        recipe.tags.push(tag);
      else
        recipe.tags = [tag];
  }

  // Remove a tag from a recipe
  deleteTagFrom(recipe: Recipe, tag: string): void {
    if (recipe && tag && recipe.tags) {
      let i = recipe.tags.indexOf(tag);

      if (i !== -1) recipe.tags.splice(i, 1);
    }
  }
}
