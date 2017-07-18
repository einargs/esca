import { Observable }             from "rxjs/Observable";
import "rxjs/add/observable/of";

import { CommonModule }           from "@angular/common";
import { FormsModule }            from "@angular/forms";
import { Router }                 from "@angular/router";
import { RouterTestingModule }    from "@angular/router/testing";
import { By }                     from "@angular/platform-browser";
import { DebugElement }           from "@angular/core";
import {
  async, fakeAsync, tick,
  ComponentFixture, TestBed
}                                 from '@angular/core/testing';

import { RecipeListComponent }    from './recipe-list.component';
import { RecipeService }          from "../recipe.service";
import { RecipeGist }             from "../recipe-gist";

import { MdDialog }               from "@angular/material";
import { MaterialImportsModule }  from "../../imports/material-imports.module";

import { BlankComponent }         from "../../../../testing/blank-component";
import { mockRecipeService }      from "../../../../testing/mock-recipe-service";

let component:      RecipeListComponent;
let fixture:        ComponentFixture<RecipeListComponent>;
let recipeService:  RecipeService;
let page:           Page;

let genTestGists = () => [
  {
    $key: "1111",
    owner_id: "weee",
    name: "test",
    tags: ["testing"],
    time: 45,
    ingredients: ["time"]
  }
];

describe('RecipeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [
        CommonModule,
        FormsModule,
        MaterialImportsModule,
        RouterTestingModule.withRoutes([
          { path: "recipe/:id", component: BlankComponent }
        ])
      ],
      declarations: [
        BlankComponent,
        RecipeListComponent
      ],
      providers:    [
        mockRecipeService(m => {
          m.newRecipe
            .and.callFake(() => Promise.resolve("id"));
          m.deleteRecipe
            .and.callFake(() => Promise.resolve());
          m.getCurrentUserRecipeGists
            .and.callFake(() => Observable.of(genTestGists()));
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    page      = new Page();

    recipeService = fixture.debugElement.injector.get(RecipeService);

    component.openDeleteRecipeDialog = jasmine
      .createSpy("openDeleteRecipeDialog")
      .and.callFake((name: string): Promise<boolean> => Promise.resolve(true));

    page.update();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it("should show a list of recipes (async)", async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.loadElements();
      expect(page.listItems.length).toBe(1);
      expect(page.listedRecipes).toContain("test");
    });
  }));

  it("should filter recipes by tags (fakeAsync)", fakeAsync(() => {
    tick();
    page.update();

    expect(page.listItems.length).toBe(1);
    expect(page.listedRecipes).toContain("test");

    component.filterByTags(["chicken"]);
    tick();
    page.update();

    expect(page.listItems.length).toBe(0);
    expect(page.listedRecipes).not.toContain("test");

    component.filterByTags(["testing"]);
    tick();
    page.update();

    expect(page.listItems.length).toBe(1);
    expect(page.listedRecipes).toContain("test");
  }));

  it("should tell the service to delete recipes (fakeAsync)", fakeAsync(() => {
    tick();
    page.update();

    page.deleteButtons[0].click();
    tick();

    expect(recipeService.deleteRecipe).toHaveBeenCalled();
  }));

  it("should tell the service to create recipes (fakeAsync)", fakeAsync(() => {
    tick();
    page.update();

    page.newButton.click();
    tick();

    expect(recipeService.newRecipe).toHaveBeenCalled();
  }));
});

class Page {
  deList:           DebugElement;
  deNewButton:      DebugElement;
  deListItems:      DebugElement[];
  deRecipeLinks:    DebugElement[];
  deDeleteButtons:  DebugElement[];

  list:             HTMLElement;
  newButton:        HTMLElement;
  listItems:        HTMLElement[];
  recipeLinks:      HTMLElement[];
  deleteButtons:    HTMLElement[];

  listedRecipes:    string[];

  loadElements() {
    let f = fixture.debugElement;

    this.deList = f.query(By.css(".list"));
    this.list = this.deList.nativeElement;

    this.deNewButton = f.query(By.css(".new-recipe"));
    this.newButton = this.deNewButton.nativeElement;

    this.deListItems = f.queryAll(By.css(".recipe-item"));
    this.listItems = this.deListItems.map(de => de.nativeElement);

    this.deDeleteButtons = f.queryAll(By.css(".recipe-item button"));
    this.deleteButtons = this.deDeleteButtons.map(de => de.nativeElement);

    this.deRecipeLinks = f.queryAll(By.css(".recipe-item a"));
    this.recipeLinks = this.deRecipeLinks.map(de => de.nativeElement);

    this.listedRecipes = this.recipeLinks.map(el => el.textContent);
  }

  //NOTE:This calls fixture.detectChanges for you
  update() {
    fixture.detectChanges();
    this.loadElements();
  }
}
