import { Component }   from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: "sign-in-landing-dialog",
  template: `
    <h2 md-dialog-title class="mat-h2">Select Sign In Method</h2>
    <md-dialog-content class="method-container">
      <p class="mat-body-1">
        How do you want to sign in?
      </p>
      <button md-button
        [md-dialog-close]="'google'"
        class="method">Sign In With Google</button>
      <button md-button
        [md-dialog-close]="'local'"
        class="method">Sign In</button>
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
