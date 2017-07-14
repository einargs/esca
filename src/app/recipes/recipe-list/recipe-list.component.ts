import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MdDialog }                         from "@angular/material";

import { Recipe }                           from "../recipe";
import { RecipeGist }                       from "../recipe-gist";
import { DeleteRecipeDialogComponent }      from "./delete-recipe-dialog.component";
import { RecipeService }                    from "../recipe.service";
import { UserService }                      from "../../user/user.service";

@Component({
  selector: "recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: [ "./recipe-list.component.sass" ]
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<RecipeGist[]>;

  constructor(
    private route:    ActivatedRoute,
    private router:   Router,
    private service:  RecipeService,
    private userService: UserService,
    public dialog:    MdDialog
  ) {}

  ngOnInit(): void {
    this.userService.userIdSubject.subscribe(id => {
      if (id) this.recipes = this.service.getUserRecipeGists(id);
    });
  }

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

    if (confirmation) await this.service.deleteRecipe(recipe);
  }
}
