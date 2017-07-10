import { Observable }         from "rxjs/Observable";

import { Component }          from "@angular/core";
import { AngularFireAuth }    from 'angularfire2/auth';
import * as firebase          from 'firebase/app';

@Component({
  selector: "app-user-ctrl",
  template:`
    <button md-raised-button
      *ngIf="user | async"
      (click)="signOut()">Sign Out</button>
    <button md-raised-button
      *ngIf="!(user | async)"
      (click)="signIn()">Sign In</button>
    `
})
export class AppUserCtrlComponent {
  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;
  }

  //
  signIn(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  //
  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
