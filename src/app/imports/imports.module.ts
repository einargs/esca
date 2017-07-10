import { NgModule }        from '@angular/core';

import { MaterialImportsModule } from "./material-imports.module";

@NgModule({
  imports: [
    MaterialImportsModule
  ],
  exports: [
    MaterialImportsModule
  ]
})
export class ImportsModule { }
