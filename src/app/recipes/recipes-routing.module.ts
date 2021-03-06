import { NgModule }               from "@angular/core";
import { RouterModule, Routes }   from "@angular/router";

import { RecipeListComponent }    from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent }  from "./recipe-detail/recipe-detail.component";

import { UserService }            from "../user/user.service";
import { RequireUserGuard }       from "../user/require-user-guard.service";
import { RecipeSavedGuard }       from "./recipe-detail/recipe-saved-guard.service";
import { RecipeDetailResolver }   from "./recipe-detail/recipe-detail-resolver.service";

const recipesRoutes: Routes = [
  {
    path: "",
    canActivateChild: [RequireUserGuard],
    children: [
      { path: "", component: RecipeListComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        canDeactivate: [RecipeSavedGuard],
        resolve: { recipe: RecipeDetailResolver }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RequireUserGuard,
    RecipeSavedGuard,
    RecipeDetailResolver
  ]
})
export class RecipesRoutingModule {}
