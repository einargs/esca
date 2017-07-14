import {Observable }                    from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Injectable }                   from "@angular/core";
import { AngularFireDatabase }          from "angularfire2/database";
import { AngularFireAuth }              from 'angularfire2/auth';
import * as firebase                    from 'firebase/app';

import { UserService }                  from "../user/user.service";
import { Recipe }                       from "./recipe";
import { RecipeGist }                   from "./recipe-gist";
import { RecipeFilter, applyFilter }    from "./recipe-filter";

@Injectable()
export class RecipeService {
  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {}

  getUserRecipeGists(userId: string): Observable<RecipeGist[]> {
    return this.db.list(`/user/${userId}/recipe`);
  }

  getCurrentUserRecipeGists(): Observable<RecipeGist[]> {
    return this.userService.userIdSubject
      .switchMap(id => id ? this.getUserRecipeGists(id) : []);
  }

  // Filter the recipe array of a passed observable
  filter(
    filter: RecipeFilter, recipeGists: Observable<RecipeGist[]>
  ): Observable<RecipeGist[]> {
    return recipeGists.map(gists => applyFilter(filter, gists));
  }

  // Filter the recipe array of a passed observable by tags
  filterByTags(
    tags: string[], gists: Observable<RecipeGist[]>
  ): Observable<RecipeGist[]> {
    return this.filter({ hasTags: tags }, gists);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.db.object(`/recipe/${id}`);
  }

  // Create a brand-new recipe
  async newRecipe(): Promise<string> {
    let uid = this.userService.userId;

    if (!uid) throw Error("User not logged in");

    let key = this.db.list("/recipe").push({
      owner_id: uid,
      name: "New Recipe",
      tags: [],
      time: 0,
      ingredients: [],
      instructions: []
    }).key;

    this.db.object(`/user/${uid}/recipe/${key}`).set({
      owner_id: uid,
      name: "New Recipe",
      time: 0
    });

    return key;
  }

  // Delete a recipe
  async deleteRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass id for deletion");

    let id = recipe.$key;
    let uid = recipe.owner_id;

    let p1 = this.db.list("/recipe").remove(id);
    let p2 = this.db.list(`/user/${uid}/recipe`).remove(id);

    await p1;
    await p2;
  }

  // Save a recipe
  async saveRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass recipe to be saved");

    let {
      $key, owner_id="", name="", time=0,
      tags=[], ingredients=[], instructions=""
    } = recipe;

    let recUpdate = this.db.object(`/recipe/${$key}`).update({
      owner_id, name, time, tags, ingredients, instructions
    });
    let gistUpdate = this.db.object(`/user/${owner_id}/recipe/${$key}`).update({
      owner_id, name, time, tags, ingredients
    });

    await recUpdate;
    await gistUpdate;
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
