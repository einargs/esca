import { Component, Inject }            from "@angular/core";
import { MdDialogRef, MD_DIALOG_DATA }  from "@angular/material";

@Component({
  selector: "delete-recipe-dialog",
  template: `
    <h2 md-dialog-title class="mat-h2">Delete Recipe</h2>
    <md-dialog-content class="mat-body-1">Are you sure you want to delete your {{recipeName}} recipe?</md-dialog-content>
    <md-dialog-actions class="button-container">
      <button md-button [md-dialog-close]="false">Cancel</button>
      <button md-button [md-dialog-close]="true">Delete</button>
    </md-dialog-actions>
    `
})
export class DeleteRecipeDialogComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public recipeName: string,
    public dialogRef: MdDialogRef<DeleteRecipeDialogComponent>
  ) {}
}
