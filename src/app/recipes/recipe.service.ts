import {Observable }                    from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Injectable }                   from "@angular/core";
import { AngularFireDatabase }          from "angularfire2/database";
import { AngularFireAuth }              from 'angularfire2/auth';
import * as firebase                    from 'firebase/app';

import { UserService }                  from "../user/user.service";
import { Recipe }                       from "./recipe";
import { RecipeGist, recipeGistUtil }   from "./recipe-gist";

import * as dbUtil                      from "./db-util";

@Injectable()
export class RecipeService {
  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {}

  getUserRecipeGists(userId: string): Observable<RecipeGist[]> {
    return this.db.list(`/recipe-gists-by-user/${userId}`)
      .map(gists => gists.map(dbUtil.buildGist));
  }

  getCurrentUserRecipeGists(): Observable<RecipeGist[]> {
    return this.userService.userIdSubject
      .switchMap(id => id ? this.getUserRecipeGists(id) : []);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.db.object(`/recipe/${id}`)
      .map(dbUtil.buildRecipe);
  }

  // Create a brand-new recipe
  async newRecipe(): Promise<string> {
    let uid = this.userService.userId;

    if (!uid) throw Error("User not logged in");

    let key = this.db.list("/recipe").push({
      ownerId: uid,
      name: "New Recipe"
    }).key;

    this.db.object(`/recipe-gists-by-user/${uid}/${key}`).set({
      ownerId: uid,
      name: "New Recipe"
    });

    return key;
  }

  // Delete a recipe
  async deleteRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass recipe for deletion");

    let { id, ownerId } = recipe;

    let p1 = this.db.list("/recipe").remove(id);
    let p2 = this.db.list(`/recipe-gists-by-user/${ownerId}`).remove(id);

    await p1;
    await p2;
  }

  // Save a recipe
  async saveRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass recipe to be saved");

    let { id, ownerId } = recipe;

    let serverRecipe = dbUtil.buildServerRecipe(recipe);
    let gist = recipeGistUtil.buildGist(recipe);
    let serverGist = dbUtil.buildServerGist(gist);

    let recUpdate = this.db.object(`/recipe/${id}`).update(serverRecipe);
    let gistUpdate = this.db.object(`/recipe-gists-by-user/${ownerId}/${id}`).update(serverGist);

    await recUpdate;
    await gistUpdate;
  }
}
