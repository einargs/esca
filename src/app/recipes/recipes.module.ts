import { NgModule }                     from "@angular/core";
import { CommonModule }                 from "@angular/common";
import { FormsModule }                  from "@angular/forms";
import { RouterModule }                 from "@angular/router";

import { RecipeDetailComponent }        from "./recipe-detail/recipe-detail.component";
import { RecipeListComponent }          from "./recipe-list/recipe-list.component";
import { DeleteRecipeDialogComponent }  from "./recipe-list/delete-recipe-dialog.component";

import { RecipeService }                from "./recipe.service";

import { MaterialImportsModule }        from "../imports/material-imports.module";
import { RecipesRoutingModule }         from "./recipes-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialImportsModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipeDetailComponent,
    RecipeListComponent,
    DeleteRecipeDialogComponent
  ],
  entryComponents: [
    DeleteRecipeDialogComponent
  ],
  providers: [ RecipeService ]
})
export class RecipesModule {}
