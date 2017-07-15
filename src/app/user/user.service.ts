import { Observable }       from "rxjs/Observable";
import { BehaviorSubject }  from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/do';

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

  private setupAuthDialog(component: any): Promise<any> {
    let dialog = this.dialog.open(component);

    let sub = this.userSubject.subscribe(user => {
      if (user) {
        dialog.close();
        sub.unsubscribe();
      }
    });

    return dialog.afterClosed().do(() => {
      sub.unsubscribe();
    }).toPromise();
  }

  async signInPopup(): Promise<void> {
    switch (await this.selectSignInMethodPopup()) {
      case "sign-up":
        await this.signUpWithEmailAndPasswordPopup();
        break;
      case "email":
        await this.signInWithEmailAndPasswordPopup();
        break;
      case "google":
        await this.signInWithGooglePopup();
        break;
    }
  }

  selectSignInMethodPopup(): Promise<any> {
    return this.setupAuthDialog(SignInLandingDialogComponent);
  }

  signUpWithEmailAndPasswordPopup(): Promise<void> {
    return this.setupAuthDialog(LocalSignUpDialogComponent)
      .then(result => {
        if (result)
          this.afAuth.auth.createUserWithEmailAndPassword(
            result.email, result.password
          );
      });
  }

  signInWithEmailAndPasswordPopup(): Promise<void> {
    return this.setupAuthDialog(LocalSignInDialogComponent)
      .then(result => {
        if (result)
          this.afAuth.auth.signInWithEmailAndPassword(
            result.email, result.password
          );
      });
  }

  async signInWithGooglePopup(): Promise<void> {
    await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async signOut(): Promise<void> {
    await this.afAuth.auth.signOut();
  }
}
