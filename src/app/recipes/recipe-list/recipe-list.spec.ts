import { Observable }                           from "rxjs/Observable";
import "rxjs/add/observable/of";

import { CommonModule }                         from "@angular/common";
import { FormsModule }                          from "@angular/forms";
import { Router }                               from "@angular/router";
import { RouterTestingModule }                  from "@angular/router/testing";
import { By }                                   from "@angular/platform-browser";
import { DebugElement }                         from "@angular/core";
import { async, ComponentFixture, TestBed }     from '@angular/core/testing';

import { RecipeListComponent }                  from './recipe-list.component';
import { RecipeService }                        from "../recipe.service";
import { RecipeGist }                           from "../recipe-gist";

import { MaterialImportsModule }                from "../../imports/material-imports.module";

import { BlankComponent }                       from "../../../testing/blank-component";
import { MockRecipeService }                    from "../../../testing/mock-recipe.service";

let component:      RecipeListComponent;
let fixture:        ComponentFixture<RecipeListComponent>;
let recipeService:  RecipeService;
let page:           Page;

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
        { provide: RecipeService, useClass: MockRecipeService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    page      = new Page();

    recipeService = fixture.debugElement.injector.get(RecipeService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it("should show a list of recipes (async)", async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
      expect(page.listItems.length).toBe(1);
      expect(page.recipeLinks[0].textContent).toBe("test");
    });
  }));
});

class Page {
  list:         HTMLElement;
  listItems:    HTMLElement[];
  recipeLinks:  HTMLElement[];

  addPageElements() {
    let deList = fixture.debugElement.query(By.css(".list"));
    this.list = deList.nativeElement;

    let deListItems = fixture.debugElement.queryAll(By.css(".recipe-item"));
    this.listItems = deListItems.map(de => de.nativeElement);

    this.recipeLinks = fixture.debugElement.queryAll(By.css(".recipe-item a")).map(de => de.nativeElement);
  }
}
