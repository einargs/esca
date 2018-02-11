import {Observable }                    from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable }                   from "@angular/core";
import { AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection }          from "angularfire2/firestore";
import { AngularFireAuth }              from 'angularfire2/auth';
import { firestore }                    from 'firebase/app';

import { UserService }                  from "../user/user.service";
import { User }                         from "../user/user";
import { Recipe, RecipeBase }           from "./recipe";
import { RecipeFilter }                 from "./recipe-filter";


// The form of a recipe when stored in the firestore database
interface DataRecipe {
  id: string;
  ownerId: string;
  name: string;
  tags: any; // Actually a map of strings to true booleans
  ingredients: string[];
  instructions: string;
}

// Build the serverside recipe format from a clientside recipe
function buildDataFromRecipe(recipe: Recipe): DataRecipe {
  let data = {...recipe, tags:{}};

  for (let tag of recipe.tags)
    data.tags[tag] = true;

  return data;
}

// Build a clientside recipe from a serverside recipe
function buildRecipeFromData(data: DataRecipe): Recipe {
  return { ...data, tags: Object.keys(data.tags) };
}


@Injectable()
export class RecipeService {
  private recipeCollection: AngularFirestoreCollection<DataRecipe>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService
  ) {
    this.recipeCollection = afs.collection<DataRecipe>("recipes");
  }

  // Utility method
  private getRecipeRef(id: string): AngularFirestoreDocument<DataRecipe> {
    return this.recipeCollection.doc(id);
  }

  // Utility method
  private getFilteredRecipeCollectionRef(filter: RecipeFilter): AngularFirestoreCollection<DataRecipe> {
    return this.afs.collection<DataRecipe>("recipes", (ref: any) => {
      if (filter.tags) {
        for (let tag of filter.tags)
          ref = ref.where(`tags.${tag}`, "==", true);
      }
      if (filter.ownerId) {
        ref = ref.where("ownerId", "==", filter.ownerId);
      }

      return ref;
    });
  }

  // Accepts an observable that emits filters
  // Returns an observable switchMap'd to give updated filters
  getFilteredRecipes(filterObservable: Observable<RecipeFilter>): Observable<Recipe[]> {
    return filterObservable
      .switchMap(filter => this.getFilteredRecipeCollectionRef(filter).valueChanges())
      .map(dataRecipes => dataRecipes.map(buildRecipeFromData));
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.getRecipeRef(id)
      .valueChanges()
      .map(buildRecipeFromData);
  }

  // Create a brand-new recipe
  async newRecipe(owner: User): Promise<Recipe> {
    let recipe: Recipe = {
      ownerId: owner.id,
      id: this.afs.createId(),
      name: "Untitled Recipe",
      tags: [],
      ingredients: [],
      instructions: ""
    };

    await this.saveRecipe(recipe);

    return recipe;
  }

  // Delete a recipe
  async deleteRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass recipe for deletion");

    await this.getRecipeRef(recipe.id).delete();
  }

  // Save a recipe
  async saveRecipe(recipe: Recipe): Promise<void> {
    if (!recipe) throw Error("Must pass recipe to be saved");

    await this.getRecipeRef(recipe.id).set(buildDataFromRecipe(recipe));
  }
}
