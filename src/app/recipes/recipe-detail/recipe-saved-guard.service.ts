import 'rxjs/add/operator/toPromise';

import { Injectable }                 from "@angular/core";
import { MdDialog }                   from "@angular/material";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                                     from '@angular/router';

import { RecipeDetailComponent }      from "./recipe-detail.component";
import { ConfirmNavDialogComponent }  from "./confirm-nav-dialog.component";

@Injectable()
export class RecipeSavedGuard implements CanDeactivate<RecipeDetailComponent> {
  constructor(
    private dialog: MdDialog
  ) {}

  async prompt(savable: boolean): Promise<string> {
    return this.dialog.open(ConfirmNavDialogComponent, {
      data: savable
    })
      .afterClosed()
      .toPromise();
  }

  async canDeactivate(
    component: RecipeDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (component.form.pristine) return true;

    let savable = component.form.valid;
    console.log(savable);
    let res = await this.prompt(savable);

    switch (res) {
      case "save":
        await component.save();
        return true;
      case "leave":
        return true;
      case "cancel":
        return false;
      default:
        return false;
    }
  }
}
