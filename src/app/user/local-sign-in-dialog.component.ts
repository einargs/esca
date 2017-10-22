import { Component }    from "@angular/core";
import { MatDialogRef }  from "@angular/material";

@Component({
  selector: "local-sign-in-dialog",
  template: `
    <h2 matDialogTitle class="mat-h2">Sign In</h2>
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
    </mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button mat-button
        [matDialogClose]="{email:email.value, password:password.value}">Sign In</button>
      <button mat-button
        [matDialogClose]="false">Cancel</button>
    </mat-dialog-actions>
    `,
  styles: [`
    .field { display: block }
    .actions { flex-direction: row-reverse }
    `]
})
export class LocalSignInDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocalSignInDialogComponent>
  ) {}
}
