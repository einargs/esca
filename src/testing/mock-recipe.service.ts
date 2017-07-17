import { Observable }     from "rxjs/Observable";
import "rxjs/add/observable/of";

import { Injectable }     from "@angular/core";

import { RecipeService }  from "../app/recipes/recipe.service";
import { RecipeGist }     from "../app/recipes/recipe-gist";

@Injectable()
export class MockRecipeService {
  private genGists(): RecipeGist[] {
    return [
      {
        $key: "1111",
        owner_id: "weee",
        name: "test",
        tags: ["testing"],
        time: 45,
        ingredients: ["time"]
      }
    ];
  }

  getCurrentUserRecipeGists = jasmine.createSpy("getCurrentUserRecipeGists")
    .and.callFake(() => Observable.of(this.genGists()));

  newRecipe = jasmine.createSpy("newRecipe");
  deleteRecipe = jasmine.createSpy("deleteRecipe");

  // Various utility methods on Recipe Service (that should be moved out of it)
  filter = RecipeService.prototype.filter;
  filterByTags = RecipeService.prototype.filterByTags;
  addIngredientTo = RecipeService.prototype.addIngredientTo;
  deleteIngredientFrom = RecipeService.prototype.deleteIngredientFrom;
  addTagTo = RecipeService.prototype.addTagTo;
  deleteTagFrom = RecipeService.prototype.deleteTagFrom;
}
