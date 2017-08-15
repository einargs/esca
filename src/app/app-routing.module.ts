import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "./not-found.component";

const routes: Routes = [
  { path: "recipe", loadChildren: "app/recipes/recipes.module#RecipesModule" },
  { path: "", redirectTo: "recipe", pathMatch: "full" },
  { path: "about", loadChildren: "app/about/about.module#AboutModule" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
