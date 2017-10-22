import { Component }   from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "sign-in-landing-dialog",
  template: `
    <h2 matDialogTitle class="mat-h2">Sign In</h2>
    <mat-dialog-content class="method-container">
      <button mat-button
        [matDialogClose]="'google'"
        class="method">With Google</button>
      <button mat-button
        [matDialogClose]="'email'"
        class="method">With Email</button>
      <button mat-button
        [matDialogClose]="'sign-up'"
        class="method">Sign Up</button>
    </mat-dialog-content>
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
    public dialogRef: MatDialogRef<SignInLandingDialogComponent>
  ) {}
}
