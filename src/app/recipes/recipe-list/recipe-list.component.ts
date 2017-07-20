import { Observable }                       from "rxjs/Observable";
import { BehaviorSubject }                  from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/toPromise';

import { Component }                        from '@angular/core';
import { Router }                           from '@angular/router';
import { MdDialog }                         from "@angular/material";

import { Recipe }                           from "../recipe";
import { RecipeGist }                       from "../recipe-gist";
import { RecipeFilter, filterUtil }         from "../recipe-filter";
import { DeleteRecipeDialogComponent }      from "./delete-recipe-dialog.component";
import { RecipeService }                    from "../recipe.service";
import { UserService }                      from "../../user/user.service";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: [ "./recipe-list.component.sass" ]
})
export class RecipeListComponent {
  filter: RecipeFilter = {
    hasTags: []
  };

  filterSubject: BehaviorSubject<RecipeFilter> = new BehaviorSubject(this.filter);

  recipes: Observable<RecipeGist[]> = filterUtil.makeFilteredObservable(
    this.filterSubject,
    this.service.getCurrentUserRecipeGists()
  );

  constructor(
    private router:   Router,
    private service:  RecipeService,
    public dialog:    MdDialog
  ) {}

  // Create a new recipe and navigate to it
  newRecipe(): Promise<void> {
    return this.service.newRecipe()
      .then(id => {
        this.router.navigate(["/recipe", id]);
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

    if (confirmation) await this.service.deleteRecipe(recipe);
  }

  //
  updateFilter(): void {
    this.filterSubject.next(this.filter);
  }
}
