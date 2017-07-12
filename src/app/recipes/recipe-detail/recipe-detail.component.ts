//import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Recipe }                           from "../recipe";
import { RecipeService }                    from "../recipe.service";

@Component({
  selector: "recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: [ "./recipe-detail.component.sass" ]
})
export class RecipeDetailComponent {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService
  ) {}

  // Add an ingredient
  addIngredient(ingredient: string): void {
    this.service.addIngredientTo(this.recipe, ingredient);
  }

  // Delete an ingredient
  deleteIngredient(ingredient: string): void {
    this.service.deleteIngredientFrom(this.recipe, ingredient);
  }

  // Add a tag
  addTag(tag: string): void {
    this.service.addTagTo(this.recipe, tag);
  }

  // Delete a tag
  deleteTag(tag: string): void {
    this.service.deleteTagFrom(this.recipe, tag);
  }

  // Save the recipe
  save(): void {
    this.service.saveRecipe(this.recipe);
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
