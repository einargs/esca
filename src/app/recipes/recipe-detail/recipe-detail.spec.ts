import { Observable }             from "rxjs/Observable";
import "rxjs/add/observable/of";

import { CommonModule }           from "@angular/common";
import { FormsModule }            from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule }    from "@angular/router/testing";
import { By }                     from "@angular/platform-browser";
import { DebugElement }           from "@angular/core";
import {
  async, fakeAsync, tick,
  ComponentFixture, TestBed
}                                 from '@angular/core/testing';

import { RecipeDetailComponent }  from "./recipe-detail.component";
import { RecipeService }          from "../recipe.service";
import { Recipe }                 from "../recipe";

import { MaterialImportsModule }  from "../../imports/material-imports.module";

import { mockRecipeService }      from "../../../../testing/mock-recipe-service";

let component:      RecipeDetailComponent;
let fixture:        ComponentFixture<RecipeDetailComponent>;
let route:          ActivatedRoute;
let recipeService:  RecipeService;
let page:           Page;

let recipe = () => component.recipe;

let genTestRecipe = () => ({
  $key: "1111",
  owner_id: "weee",
  name: "test",
  tags: ["testing", "test"],
  time: 45,
  ingredients: ["time", "money"],
  instructions: "Test things?"
});

describe("RecipeDetailComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [
        CommonModule,
        FormsModule,
        MaterialImportsModule,
        RouterTestingModule
      ],
      declarations: [
        RecipeDetailComponent
      ],
      providers:    [
        mockRecipeService(m => {
          m.getRecipe
            .and.returnValue(Observable.of(genTestRecipe()));
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    page      = new Page();

    recipeService = fixture.debugElement.injector.get(RecipeService);
    route         = fixture.debugElement.injector.get(ActivatedRoute);

    page.update();
  });

  it("should display the recipe name (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(recipe().name).toBe("test");
    expect(page.title).toBe("test");

    recipe().name = "New Test";
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(recipe().name).toBe("New Test");
    expect(page.title).toBe("New Test");
  }));

  //TODO:The current temporary tag UI isn't being tested

  it("should display the recipe duration (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(recipe().time).toBe(45);
    expect(page.time).toBe(45);

    recipe().time = 30;
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(recipe().time).toBe(30);
    expect(page.time).toBe(30);
  }));

  it("should display the recipe ingredients (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(recipe().ingredients).toEqual(["time", "money"]);
    expect(page.ingredients).toEqual(["time", "money"]);

    recipe().ingredients = ["effort", "people"];
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(recipe().ingredients).toEqual(["effort", "people"]);
    expect(page.ingredients).toEqual(["effort", "people"]);
  }));

  it("should display the recipe instructions (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(recipe().instructions).toEqual("Test things?");
    expect(page.instructions).toEqual("Test things?");

    recipe().instructions = "Play around with stuff.";
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(recipe().instructions).toEqual("Play around with stuff.");
    expect(page.instructions).toEqual("Play around with stuff.");
  }));

  it("should save the recipe (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    page.saveButton.click();

    expect(recipeService.saveRecipe).toHaveBeenCalled();
  }));
});

class Page {
  saveButton:   HTMLButtonElement;

  title:        string;
  time:         number;
  ingredients:  string[];
  instructions: string;

  loadElements() {
    let f = fixture.debugElement;

    this.title        = f
      .query(By.css(".recipe-title input"))
      .nativeElement
      .value;

    this.time         = +f
      .query(By.css(".recipe-time input"))
      .nativeElement
      .value;

    this.ingredients  = f
      .queryAll(By.css(".ingredient-name"))
      .map(el => el.nativeElement.textContent);

    this.instructions = f
      .query(By.css(".recipe-instructions textarea"))
      .nativeElement
      .value;

    this.saveButton   = f
      .query(By.css(".save-button"))
      .nativeElement;
  }

  update() {
    fixture.detectChanges();
    this.loadElements();
  }
}