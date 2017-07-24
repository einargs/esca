import { Component, Inject }            from "@angular/core";
import { MdDialogRef, MD_DIALOG_DATA }  from "@angular/material";

@Component({
  selector: "confirm-nav-dialog",
  template: `
    <h2 md-dialog-title class="mat-h2">Leave this page?</h2>
    <md-dialog-content class="mat-body-1">Your changes haven't been saved.</md-dialog-content>
    <md-dialog-actions class="button-container">
      <button md-button
        [md-dialog-close]="'save'"
        [disabled]="!savable">Save and leave</button>
      <button md-button [md-dialog-close]="'cancel'">Go back</button>
      <button md-button [md-dialog-close]="'leave'">Leave without saving</button>
    </md-dialog-actions>
    `,
  styles: [`
    .button-container {
      flex-direction: row-reverse;
    }
    `]
})
export class ConfirmNavDialogComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public savable: boolean,
    public dialogRef: MdDialogRef<ConfirmNavDialogComponent>
  ) {}
}
