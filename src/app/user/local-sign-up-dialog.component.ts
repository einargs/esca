import { Component }    from "@angular/core";
import { MatDialogRef }  from "@angular/material";

@Component({
  selector: "local-sign-up-dialog",
  template:`
    <h2 matDialogTitle class="mat-h2">Sign Up</h2>
    <mat-dialog-content class="mat-body-1">
      <mat-form-field class="field">
        <input matInput #email
          type="email" placeholder="email"
          name="email" />
      </mat-form-field>
      <mat-form-field class="field">
        <input matInput #password
          type="password" placeholder="password"
          name="password" />
      </mat-form-field>
      <mat-form-field class="field">
        <input matInput #passwordConfirm
          type="password" placeholder="confirm password"
          name="passwordConfirm" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button mat-button
        [disabled]="password.value !== passwordConfirm.value"
        [matDialogClose]="{email:email.value, password:password.value}">Sign Up</button>
      <button mat-button
        [matDialogClose]="false">Cancel</button>
    </mat-dialog-actions>
    `,
  styles: [`
    .field { display: block }
    .actions { flex-direction: row-reverse }
    `]
})
export class LocalSignUpDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocalSignUpDialogComponent>
  ) {}
}
