import { Component }   from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: "delete-recipe-dialog",
  template: `
    <h2 md-dialog-title class="mat-h2">Delete Recipe</h2>
    <md-dialog-content class="mat-body-1">Are you sure you want to delete this recipe?</md-dialog-content>
    <md-dialog-actions class="button-container">
      <button md-button [md-dialog-close]="false">No</button>
      <span class="expand"></span>
      <button md-button [md-dialog-close]="true">Yes</button>
    </md-dialog-actions>
    `,
  styles: [`
    .button-container { display: flex }
    .expand { flex: 1 auto }
    `]
})
export class DeleteRecipeDialogComponent {
  constructor(public dialogRef: MdDialogRef<DeleteRecipeDialogComponent>) {}
}
