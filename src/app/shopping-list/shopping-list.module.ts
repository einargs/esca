import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from "../imports/material-imports.module";

import { ShoppingListMasterComponent } from './shopping-list-master/shopping-list-master.component';
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';
import { ShoppingListService } from "./shopping-list.service";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule,
    ShoppingListRoutingModule
  ],
  declarations: [
    ShoppingListMasterComponent,
    ShoppingListDetailComponent
  ],
  providers: [
    ShoppingListService
  ]
})
export class ShoppingListModule { }
