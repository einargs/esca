import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSidenavModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatChipsModule,
  MatCardModule,
  MatCheckboxModule
} from "@angular/material";

const matImports = [
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSidenavModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatChipsModule,
  MatCardModule,
  MatCheckboxModule
];

@NgModule({
  imports: [
    ...matImports
  ],
  exports: [
    ...matImports
  ]
})
export class MaterialImportsModule {}
