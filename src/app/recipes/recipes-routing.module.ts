import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { RecipeListComponent }   from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipesRoutes: Routes = [
  { path: "recipe", component: RecipeListComponent },
  { path: "recipe/:id", component: RecipeDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [ RouterModule ]
})
export class RecipesRoutingModule {}
