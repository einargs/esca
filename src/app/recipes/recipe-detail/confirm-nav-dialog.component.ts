import { Component, Inject }            from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA }  from "@angular/material";

@Component({
  selector: "confirm-nav-dialog",
  template: `
    <h2 matDialogTitle class="mat-h2">Leave this page?</h2>
    <mat-dialog-content class="mat-body-1">Your changes haven't been saved.</mat-dialog-content>
    <mat-dialog-actions class="button-container">
      <button mat-button
        [matDialogClose]="'save'"
        [disabled]="!savable">Save and leave</button>
      <button mat-button [matDialogClose]="'cancel'">Go back</button>
      <button mat-button [matDialogClose]="'leave'">Leave without saving</button>
    </mat-dialog-actions>
    `,
  styles: [`
    .button-container {
      flex-direction: row-reverse;
    }
    `]
})
export class ConfirmNavDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public savable: boolean,
    public dialogRef: MatDialogRef<ConfirmNavDialogComponent>
  ) {}
}
