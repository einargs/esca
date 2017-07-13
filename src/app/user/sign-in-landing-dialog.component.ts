import { Component }   from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: "sign-in-landing-dialog",
  template: `
    <h2 md-dialog-title class="mat-h2">Sign In</h2>
    <md-dialog-content class="method-container">
      <button md-button
        [md-dialog-close]="'google'"
        class="method">With Google</button>
      <button md-button
        [md-dialog-close]="'email'"
        class="method">With Email</button>
      <button md-button
        [md-dialog-close]="'sign-up'"
        class="method">Sign Up</button>
    </md-dialog-content>
    `,
  styles: [`
    .method {
      display: block;
      width: 100%;
      text-align: center;
    }
    `]
})
export class SignInLandingDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<SignInLandingDialogComponent>
  ) {}
}
