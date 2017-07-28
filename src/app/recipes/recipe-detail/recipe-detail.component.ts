//import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Component, OnInit, ViewChild }     from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm }                           from "@angular/forms";

import { Recipe }                           from "../recipe";
import { RecipeService }                    from "../recipe.service";

@Component({
  selector: "recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: [ "./recipe-detail.component.sass" ]
})
export class RecipeDetailComponent {
  @ViewChild("recipeForm") form: NgForm;

  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService
  ) {}

  // Add an ingredient
  addIngredient(ingredient: string): void {
    this.recipe.ingredients.push(ingredient);
  }

  // Delete an ingredient
  deleteIngredient(ingredient: string): void {
    let ingredients = this.recipe.ingredients;
    let location = ingredients.indexOf(ingredient);
    ingredients.splice(location, 1);
  }

  // Save the recipe
  async save(): Promise<void> {
    await this.service.saveRecipe(this.recipe);
    this.form.form.markAsPristine();
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: any) => {
        data.recipe.subscribe(recipe => this.recipe = recipe);
      });
  }
}
