import { Component, Inject }            from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA }  from "@angular/material";

@Component({
  selector: "delete-recipe-dialog",
  template: `
    <h2 matDialogTitle class="mat-h2">Delete Recipe</h2>
    <mat-dialog-content class="mat-body-1">Are you sure you want to delete your {{recipeName}} recipe?</mat-dialog-content>
    <mat-dialog-actions class="button-container">
      <button mat-button [matDialogClose]="true">Delete</button>
      <button mat-button [matDialogClose]="false">Cancel</button>
    </mat-dialog-actions>
    `,
    styles: [`
      .button-container {
        flex-direction: row-reverse;
      }
      `]
})
export class DeleteRecipeDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipeName: string,
    public dialogRef: MatDialogRef<DeleteRecipeDialogComponent>
  ) {}
}
