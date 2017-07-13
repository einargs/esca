import { Observable }         from "rxjs/Observable";

import { Component }          from "@angular/core";
import { AngularFireAuth }    from 'angularfire2/auth';
import * as firebase          from 'firebase/app';

import { UserService }        from "./user.service";

@Component({
  selector: "user-ctrl",
  template:`
    <button md-raised-button color="accent"
      *ngIf="user | async"
      (click)="signOut()">Sign Out</button>
    <button md-raised-button color="accent"
      *ngIf="!(user | async)"
      (click)="signIn()">Sign In</button>
    `
})
export class UserCtrlComponent {
  user: Observable<firebase.User>;

  constructor(
    private service: UserService,
    public afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;
  }

  //
  signIn(): void {
    this.service.signInPopup();
  }

  //
  signOut(): void {
    this.service.signOut();
  }
}
