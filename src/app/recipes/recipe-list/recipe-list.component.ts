import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

import { Component }                        from '@angular/core';
import { Router }                           from '@angular/router';
import { MdDialog }                         from "@angular/material";

import { Recipe }                           from "../recipe";
import { RecipeGist }                       from "../recipe-gist";
import { filterUtil }                       from "../recipe-filter";
import { DeleteRecipeDialogComponent }      from "./delete-recipe-dialog.component";
import { RecipeService }                    from "../recipe.service";
import { UserService }                      from "../../user/user.service";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: [ "./recipe-list.component.sass" ]
})
export class RecipeListComponent {
  raw: Observable<RecipeGist[]> = this.service.getCurrentUserRecipeGists();
  recipes: Observable<RecipeGist[]> = this.raw;

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

  // Filter the shown recipes by tags
  filterByTags(tags: string[]): void {
    this.recipes = filterUtil.filterObservableByTags(tags, this.raw);
  }

  // Filter by a comma deliminated string of tags
  filterByTagString(tags: string): void {
    this.filterByTags(tags.split(/,\s+/).filter(tag => tag!==""));
  }
}
