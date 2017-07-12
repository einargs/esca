import { Component }    from "@angular/core";
import { MdDialogRef }  from "@angular/material";

@Component({
  selector: "local-sign-up-dialog",
  template:`
    <h2 md-dialog-title class="mat-h2">Sign Up</h2>
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
        [md-dialog-close]="{email:email.value, password:password.value}">Sign Up</button>
      <span class="expand"></span>
      <button md-button
        [md-dialog-close]="false">Cancel</button>
    </md-dialog-actions>
    `,
  styles: [`
    .field { display: block }
    .button-container { display: flex }
    .expand { flex: 1 auto }
    `]
})
export class LocalSignUpDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<LocalSignUpDialogComponent>
  ) {}
}