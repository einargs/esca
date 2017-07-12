import { NgModule }                     from  "@angular/core";
import { CommonModule }                 from "@angular/common";
import { FormsModule }                  from "@angular/forms";

import { LocalSignInDialogComponent }   from "./local-sign-in-dialog.component";
import { LocalSignUpDialogComponent }   from "./local-sign-up-dialog.component";
import { SignInLandingDialogComponent } from "./sign-in-landing-dialog.component";

import { MaterialImportsModule }        from "../imports/material-imports.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialImportsModule
  ],
  declarations: [
    LocalSignInDialogComponent,
    LocalSignUpDialogComponent,
    SignInLandingDialogComponent
  ],
  entryComponents: [
    LocalSignInDialogComponent,
    LocalSignUpDialogComponent,
    SignInLandingDialogComponent
  ]
})
export class UserModule {}
