import { Observable }       from "rxjs/Observable";
import { BehaviorSubject }  from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/multicast';

import { Injectable }                   from '@angular/core';
import { MdDialog }                     from "@angular/material";
import { AngularFireAuth }              from "angularfire2/auth";
import * as firebase                    from "firebase/app";

import { LocalSignInDialogComponent }   from "./local-sign-in-dialog.component";
import { LocalSignUpDialogComponent }   from "./local-sign-up-dialog.component";
import { SignInLandingDialogComponent } from "./sign-in-landing-dialog.component";
import { User }                         from "./user";

@Injectable()
export class UserService {
  //TODO: Refactor this mess to use rxjs properly (however that is)
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  user: User;
  userIdSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  userId: string;
  signedIn: boolean;

  constructor(
    private dialog: MdDialog,
    private afAuth: AngularFireAuth
  ) {
    afAuth.authState
      .map(user => user ? new User(user.uid) : null)
      .multicast(this.userSubject).connect();

    // Set up user id subject
    this.userSubject
      .map(user => user ? user.id : null)
      .multicast(this.userIdSubject).connect();

    this.userSubject.subscribe(user => {
      this.signedIn = Boolean(user);
      this.userId = user ? user.id : null;
      this.user = user;
    });
  }

  signInPopup(): void {
    this.selectSignInMethodPopup()
      .subscribe(result => {
        switch (result) {
          case "sign-up":
            this.signUpWithEmailAndPasswordPopup();
            break;
          case "email":
            this.signInWithEmailAndPasswordPopup();
            break;
          case "google":
            this.signInWithGooglePopup();
            break;
        }
      });
  }

  selectSignInMethodPopup(): Observable<any> {
    return this.dialog.open(SignInLandingDialogComponent)
      .afterClosed();
  }

  signUpWithEmailAndPasswordPopup(): void {
    this.dialog.open(LocalSignUpDialogComponent)
      .afterClosed().subscribe(result => {
        if (result)
          this.afAuth.auth.createUserWithEmailAndPassword(
            result.email, result.password
          );
      });
  }

  signInWithEmailAndPasswordPopup(): void {
    this.dialog.open(LocalSignInDialogComponent)
      .afterClosed().subscribe(result => {
        if (result)
          this.afAuth.auth.signInWithEmailAndPassword(
            result.email, result.password
          );
      });
  }

  signInWithGooglePopup(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
