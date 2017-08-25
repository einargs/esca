//import { Observable }                       from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Component, OnInit, ViewChild }     from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
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
  recipeData: Recipe;

  // Aliases for form controls
  get name(): FormControl
  { return this.recipeForm.controls.name as FormControl; }
  get tags(): FormControl
  { return this.recipeForm.controls.tags as FormControl; }
  get ingredients(): FormArray
  { return this.recipeForm.controls.ingredients as FormArray; }
  get instructions(): FormControl
  { return this.recipeForm.controls.instructions as FormControl; }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // Compile the form model into a data model (i.e. recipe)
  compileFormModel(): Recipe {
    return Object.assign({}, this.recipeData, this.recipeForm.value);
  }

  // Save the recipe
  async save(): Promise<void> {
    await this.service.saveRecipe(this.compileFormModel());
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ["", Validators.required],
      tags: [[]],
      ingredients: this.fb.array([]),
      instructions: ""
    });
  }

  ingredientErrorMatcher(
    control: FormControl,
    form: FormGroupDirective
  ) {
  const isSubmitted = form && form.submitted;
  return !!(control && control.invalid && (control.touched || isSubmitted));
}

  deleteIngredient(index: number): void {
    this.ingredients.removeAt(index);
    this.ingredients.markAsDirty();
  }

  addIngredient(ingredient: string): void {
    this.ingredients.push(this.fb.control(ingredient));
    this.ingredients.markAsDirty();
  }

  loadIngredients(ingredients: string[]): void {
    let ingControls = ingredients.map(ing => this.fb.control(ing));
    let ingArray = this.fb.array(ingControls);
    this.recipeForm.setControl("ingredients", ingArray);
  }

  loadDataModel(recipe: Recipe): void {
    this.recipeForm.reset({
      name: recipe.name,
      tags: recipe.tags,
      instructions: recipe.instructions
    });
    this.loadIngredients(recipe.ingredients);
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: any) => {
        data.recipe.subscribe(recipe => {
          this.recipeData = recipe;
          this.loadDataModel(recipe);
        });
      });
  }
}
