//import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Component, OnInit, ViewChild }     from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm }                           from "@angular/forms";

import { Recipe, recipeUtil }               from "../recipe";
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
    recipeUtil.addIngredientTo(this.recipe, ingredient);
  }

  // Delete an ingredient
  deleteIngredient(ingredient: string): void {
    recipeUtil.deleteIngredientFrom(this.recipe, ingredient);
  }

  // Add a tag
  addTag(tag: string): void {
    recipeUtil.addTagTo(this.recipe, tag);
  }

  // Delete a tag
  deleteTag(tag: string): void {
    recipeUtil.deleteTagFrom(this.recipe, tag);
  }

  // Save the recipe
  async save(): Promise<void> {
    await this.service.saveRecipe(this.recipe);
    this.form.form.markAsPristine();
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getRecipe(params.get("id")))
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }
}
