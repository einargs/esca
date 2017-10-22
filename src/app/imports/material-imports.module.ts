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
  MatChipsModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatChipsModule
  ]
})
export class MaterialImportsModule {}
