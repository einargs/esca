import { NgModule }        from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialImportsModule } from "./material-imports.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MaterialImportsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MaterialImportsModule
  ]
})
export class ImportsModule { }
