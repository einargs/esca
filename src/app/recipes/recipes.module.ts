import { TagInputModule }                   from "ngx-chips";

import { NgModule }                         from "@angular/core";
import { CommonModule }                     from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule }                     from "@angular/router";

import { RecipeDetailComponent }            from "./recipe-detail/recipe-detail.component";
import { ConfirmNavDialogComponent }        from "./recipe-detail/confirm-nav-dialog.component";
import { RecipeListComponent }              from "./recipe-list/recipe-list.component";
import { DeleteRecipeDialogComponent }      from "./recipe-list/delete-recipe-dialog.component";
import { ItemListComponent }                from "./item-list/item-list.component";

import { RecipeService }                    from "./recipe.service";
import { UserService }                      from "../user/user.service";

import { MaterialImportsModule }            from "../imports/material-imports.module";
import { RecipesRoutingModule }             from "./recipes-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule,
    TagInputModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipeDetailComponent,
    RecipeListComponent,
    DeleteRecipeDialogComponent,
    ConfirmNavDialogComponent,
    ItemListComponent
  ],
  entryComponents: [
    DeleteRecipeDialogComponent,
    ConfirmNavDialogComponent
  ],
  providers: [
    UserService,
    RecipeService
  ]
})
export class RecipesModule {}
