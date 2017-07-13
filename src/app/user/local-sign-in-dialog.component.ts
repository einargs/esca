import { Component }    from "@angular/core";
import { MdDialogRef }  from "@angular/material";

@Component({
  selector: "local-sign-in-dialog",
  template: `
    <h2 md-dialog-title class="mat-h2">Sign In</h2>
    <md-dialog-content class="mat-body-1">
      <md-input-container class="field">
        <input mdInput #email
          type="email" placeholder="email"
          name="email" />
      </md-input-container>
      <md-input-container class="field">
        <input mdInput #password
          type="password" placeholder="password"
          name="password" />
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions class="button-container">
      <button md-button
        [md-dialog-close]="false">Cancel</button>
      <button md-button
        [md-dialog-close]="{email:email.value, password:password.value}">Sign In</button>
    </md-dialog-actions>
    `,
  styles: [`
    .field { display: block }
    `]
})
export class LocalSignInDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<LocalSignInDialogComponent>
  ) {}
}
