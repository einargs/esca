import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
    BrowserAnimationsModule,
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
    BrowserAnimationsModule,
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
