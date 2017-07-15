import { NgModule }               from "@angular/core";
import { RouterModule, Routes }   from "@angular/router";

import { RecipeListComponent }    from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent }  from "./recipe-detail/recipe-detail.component";

import { UserService }            from "../user/user.service";
import { RequireUserGuard }       from "../user/require-user-guard.service";

const recipesRoutes: Routes = [
  {
    path: "recipe",
    component: RecipeListComponent,
    canActivate: [RequireUserGuard]
  },{ 
    path: "recipe/:id",
    component: RecipeDetailComponent,
    canActivate: [RequireUserGuard]
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
    RequireUserGuard
  ]
})
export class RecipesRoutingModule {}
