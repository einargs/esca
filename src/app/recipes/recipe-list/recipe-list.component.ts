import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

import { Component }                        from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MdDialog }                         from "@angular/material";

import { Recipe }                           from "../recipe";
import { DeleteRecipeDialogComponent }      from "./delete-recipe-dialog.component";
import { RecipeService }                    from "../recipe.service";
import { UserService }                      from "../../user/user.service";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: [ "./recipe-list.component.sass" ]
})
export class RecipeListComponent {
  //TODO:Flatten this to use a gist of a user's recipes stored seperately
  raw = this.service.getCurrentUserRecipes();
  recipes = this.raw;

  constructor(
    private route:    ActivatedRoute,
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
  private openDeleteRecipeDialog(recipeName: string): Promise<boolean> {
    return this.dialog.open(DeleteRecipeDialogComponent, {
      data: recipeName
    }).afterClosed().toPromise();
  }

  // Delete a recipe
  async deleteRecipe(recipe: Recipe): Promise<void> {
    let confirmation = await this.openDeleteRecipeDialog(recipe.name);

    if (confirmation)
      await this.service.deleteRecipe(recipe.$key);
  }

  // Filter the shown recipes by tags
  filterByTags(tags: string[]): void {
    console.log(tags);
    this.recipes = this.service.filterByTags(tags, this.raw);
  }

  // Filter by a comma deliminated string of tags
  filterByTagString(tags: string): void {
    this.filterByTags(tags.split(/,\s+/).filter(tag => tag!==""));
  }
}
