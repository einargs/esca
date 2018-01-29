import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListMasterComponent } from "./shopping-list-master/shopping-list-master.component";

import { RequireUserGuard } from "app/user/require-user-guard.service";

const shoppingListRoutes: Routes = [
  {
    path: "",
    component: ShoppingListMasterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(shoppingListRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RequireUserGuard
  ]
})
export class ShoppingListRoutingModule {}
