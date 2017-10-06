import { Observable }                       from "rxjs/Observable";
import { BehaviorSubject }                  from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/toPromise';

import { Component }                        from '@angular/core';
import { Router }                           from '@angular/router';
import { MdDialog }                         from "@angular/material";

import { Recipe }                           from "../recipe";
import { RecipeFilter }                     from "../recipe-filter";
import { DeleteRecipeDialogComponent }      from "./delete-recipe-dialog.component";
import { RecipeService }                    from "../recipe.service";
import { UserService }                      from "../../user/user.service";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: [ "./recipe-list.component.sass" ]
})
export class RecipeListComponent {
  filterSubject: BehaviorSubject<RecipeFilter>;

  recipes: Observable<Recipe[]>;

  filteredTags: string[] = [];

  constructor(
    private router:   Router,
    private userService: UserService,
    private recipeService:  RecipeService,
    public dialog:    MdDialog
  ) {
    this.filterSubject = new BehaviorSubject(this.buildFilter());
    this.recipes = this.recipeService.getFilteredRecipes(this.filterSubject);
  }

  // Create a new recipe and navigate to it
  async newRecipe(): Promise<void> {
    let user = await this.userService.getUser();

    if (!user) throw Error("User must be signed in to make a new recipe.");

    return this.recipeService.newRecipe(user)
      .then(recipe => {
        this.router.navigate(["/recipe", recipe.id]);
      });
  }

  // Open the delete recipe dialog and retrieve the response
  //TODO:Clean up the promise bit. There must be a better way...
  openDeleteRecipeDialog(recipeName: string): Promise<boolean> {
    return this.dialog.open(DeleteRecipeDialogComponent, {
      data: recipeName
    }).afterClosed().toPromise();
  }

  // Delete a recipe
  async deleteRecipe(recipe: Recipe): Promise<void> {
    let confirmation = await this.openDeleteRecipeDialog(recipe.name);

    if (confirmation) await this.recipeService.deleteRecipe(recipe);
  }

  // Build a new filter from information
  buildFilter(): RecipeFilter {
    return {
      ownerId: this.userService.userId,
      tags: this.filteredTags
    };
  }

  // Emit a new filter from the filterSubject
  emitFilterUpdate(filter: RecipeFilter): void {
    console.log("New filter", filter);
    this.filterSubject.next(filter);
  }

  // Build and emit a new filter
  updateFiltering(): void {
    this.emitFilterUpdate(this.buildFilter());
  }
}
