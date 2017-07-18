import {Observable }                    from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Injectable }                   from "@angular/core";
import { AngularFireDatabase }          from "angularfire2/database";
import { AngularFireAuth }              from 'angularfire2/auth';
import * as firebase                    from 'firebase/app';

import { UserService }                  from "../user/user.service";
import { Recipe }                       from "./recipe";
import { RecipeGist }                   from "./recipe-gist";

@Injectable()
export class RecipeService {
  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {}

  getUserRecipeGists(userId: string): Observable<RecipeGist[]> {
    return this.db.list(`/recipe-gists-by-user/${userId}`);
  }

  getCurrentUserRecipeGists(): Observable<RecipeGist[]> {
    return this.userService.userIdSubject
      .switchMap(id => id ? this.getUserRecipeGists(id) : []);
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

    this.db.object(`/recipe-gists-by-user/${uid}/${key}`).set({
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
    let p2 = this.db.list(`/recipe-gists-by-user/${uid}`).remove(id);

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
    let gistUpdate = this.db.object(`/recipe-gists-by-user/${owner_id}/${$key}`).update({
      owner_id, name, time, tags, ingredients
    });

    await recUpdate;
    await gistUpdate;
  }
}
