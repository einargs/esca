import { NgModule } from "@angular/core";
import {
  MdToolbarModule,
  MdIconModule,
  MdListModule,
  MdInputModule,
  MdSidenavModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdDialogModule,
  MdChipsModule
} from "@angular/material";

@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdInputModule,
    MdSidenavModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdDialogModule,
    MdChipsModule
  ],
  exports: [
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdInputModule,
    MdSidenavModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdDialogModule,
    MdChipsModule
  ]
})
export class MaterialImportsModule {}
