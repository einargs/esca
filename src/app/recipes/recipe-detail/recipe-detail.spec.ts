import { Observable }             from "rxjs/Observable";
import { BehaviorSubject }        from "rxjs/BehaviorSubject";
import "rxjs/add/observable/of";

import { FormGroup }              from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule }    from "@angular/router/testing";
import { By }                     from "@angular/platform-browser";
import { DebugElement }           from "@angular/core";
import {
  async, fakeAsync, tick,
  ComponentFixture, TestBed
}                                 from '@angular/core/testing';

import { RecipesModule }          from "../recipes.module";
import { RecipeDetailComponent }  from "./recipe-detail.component";
import { RecipeService }          from "../recipe.service";
import { Recipe }                 from "../recipe";

import { ImportsModule }          from "../../imports/imports.module";

import { mockRecipeService }      from "../../../../testing/mock-recipe-service";

let component:      RecipeDetailComponent;
let fixture:        ComponentFixture<RecipeDetailComponent>;
let route:          ActivatedRoute;
let router:         Router;
let recipeService:  RecipeService;
let page:           Page;

let ctrls = new Proxy(<any>{}, {
  get(target, prop, reciever) {
    return page.form.get(<string>prop).value;
  },
  set(target, prop, val, reciever) {
    let control = page.form.get(<string>prop);
    control.setValue(val);
    control.markAsDirty();
    control.updateValueAndValidity();
    return true;
  }
});

let genTestRecipe = () => ({
  id: "1111",
  ownerId: "weee",
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
        ImportsModule,
        RecipesModule,
        RouterTestingModule
      ],
      providers:    [
        mockRecipeService()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //TestBed.get(ActivatedRoute)
    fixture   = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    page      = new Page();

    recipeService = fixture.debugElement.injector.get(RecipeService);
    route         = fixture.debugElement.injector.get(ActivatedRoute);

    route.data = new BehaviorSubject({
      recipe: Observable.of(genTestRecipe())
    });
  });

  it("should display the recipe name (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(ctrls.name).toBe("test");
    expect(page.title).toBe("test");

    ctrls.name = "New Test";
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(ctrls.name).toBe("New Test");
    expect(page.title).toBe("New Test");
  }));

  it("should display the recipe duration (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(ctrls.time).toBe(45);
    expect(page.time).toBe(45);

    ctrls.time = 30;
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(ctrls.time).toBe(30);
    expect(page.time).toBe(30);
  }));

  it("should display the recipe ingredients (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(ctrls.ingredients).toEqual(["time", "money"]);
    expect(page.ingredients).toEqual(["time", "money"]);

    ctrls.ingredients = ["effort", "people"];
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(ctrls.ingredients).toEqual(["effort", "people"]);
    expect(page.ingredients).toEqual(["effort", "people"]);
  }));

  it("should display the recipe instructions (async)", async(async () => {
    await fixture.whenStable();
    page.update();

    expect(ctrls.instructions).toEqual("Test things?");
    expect(page.instructions).toEqual("Test things?");

    ctrls.instructions = "Play around with stuff.";
    fixture.detectChanges();

    await fixture.whenStable();
    page.update();

    expect(ctrls.instructions).toEqual("Play around with stuff.");
    expect(page.instructions).toEqual("Play around with stuff.");
  }));

  it("shouldn't save a pristine recipe", () => {
    page.update();

    page.saveButton.click();

    expect(page.form.pristine).toBe(true);
    expect(recipeService.saveRecipe).not.toHaveBeenCalled();
  });

  it("should save a dirty and valid recipe", () => {
    page.update();

    ctrls.name = "Also valid name";

    page.update();

    page.saveButton.click();

    expect(page.form.dirty).toBe(true);
    expect(page.form.valid).toBe(true);
    expect(recipeService.saveRecipe).toHaveBeenCalled();
  });

  it("should disable saving when pristine", () => {
    page.update();

    expect(page.form.pristine).toBe(true);
    expect(page.form.valid).toBe(true);
    expect(page.saveButton.disabled).toBe(true);
  });

  it("should allow saving when dirty and valid", () => {
    page.update();

    ctrls.name = "other test name";

    page.update();

    expect(page.form.dirty).toBe(true);
    expect(page.form.valid).toBe(true);
    expect(page.saveButton.disabled).toBe(false);
  });

  it("should disable saving when invalid", () => {
    page.update();

    ctrls.name = "";

    page.update();

    expect(page.form.dirty).toBe(true);
    expect(page.form.valid).toBe(false);
    expect(page.saveButton.disabled).toBe(true);
  });
});

class Page {
  titleInput:   HTMLInputElement;
  saveButton:   HTMLButtonElement;
  form:         FormGroup;

  title:        string;
  time:         number;
  ingredients:  string[];
  instructions: string;

  loadElements() {
    this.form = component.recipeForm;
    let f = fixture.debugElement;


    this.titleInput   = f
      .query(By.css(".recipe-title input"))
      .nativeElement;

    this.title = this.titleInput.value;

    this.time         = +f
      .query(By.css(".recipe-time input"))
      .nativeElement
      .value;

    this.ingredients  = f
      .queryAll(By.css(".ingredient-item input"))
      .map(el => el.nativeElement.value);

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
