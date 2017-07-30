//import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Component, OnInit, ViewChild }     from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
}                                           from "@angular/forms";

import { Recipe }                           from "../recipe";
import { RecipeService }                    from "../recipe.service";

@Component({
  selector: "recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: [ "./recipe-detail.component.sass" ]
})
export class RecipeDetailComponent {
  recipeForm: FormGroup;

  // Aliases for form controls
  get name(): FormControl
  { return this.recipeForm.controls.name as FormControl; }
  get time(): FormControl
  { return this.recipeForm.controls.time as FormControl; }
  get tags(): FormControl
  { return this.recipeForm.controls.tags as FormControl; }
  get ingredients(): FormControl
  { return this.recipeForm.controls.ingredients as FormControl; }
  get instructions(): FormControl
  { return this.recipeForm.controls.instructions as FormControl; }

  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // Save the recipe
  async save(): Promise<void> {
    //await this.service.saveRecipe(this.recipe);
    //this.form.form.markAsPristine();
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ["", Validators.required],
      time: 0,
      tags: [[]],
      ingredients: [[]],
      instructions: ""
    });
  }

  loadDataModel(recipe: Recipe): void {
    this.recipeForm.reset({
      name: recipe.name,
      time: recipe.time,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: any) => {
        data.recipe.subscribe(recipe => {
          this.recipe = recipe;
          this.loadDataModel(recipe);
        });
      });
  }
}
