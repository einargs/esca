import { Observable }       from "rxjs/Observable";
import { BehaviorSubject }  from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

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

  //NOTE:A hack to tell if auth state has been loaded
  // Deals with the problem of the subjects being initialized as null
  isAuthLoaded = false;

  constructor(
    private dialog: MdDialog,
    private afAuth: AngularFireAuth
  ) {
    // Get a promise for authentication being loaded
    // When it resolves, set the boolean to true
    this.authLoaded().then(() => {
      this.isAuthLoaded = true;
    });

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

  // Get a promise that resolves when auth is loaded
  async authLoaded(): Promise<void> {
    if (this.isAuthLoaded) return;
    else await this.afAuth.authState
      .first().toPromise();
  }

  // Get a promise that waits for auth to load
  // then returns either the user if signed in
  // or null if not signed in
  async getUser(): Promise<User> {
    await this.authLoaded();

    return this.user;
  }


  // A utility function for setting up the sign in dialogs
  private setupAuthDialog(component: any): Promise<any> {
    let dialog = this.dialog.open(component);

    let sub = this.userSubject.subscribe(user => {
      if (user) {
        dialog.close();
      }
    });

    return dialog.afterClosed().do(() => {
      sub.unsubscribe();
    }).toPromise();
  }

  async signInPopup(): Promise<void> {
    await this.authLoaded();

    if (this.signedIn) return;

    switch (await this.selectSignInMethodPopup()) {
      case "sign-up":
        await this.signUpWithEmailAndPasswordPopup();
        break;
      case "email":
        await this.signInWithEmailAndPasswordPopup();
        break;
      case "google":
        await this.signInWithGoogleRedirect();
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

  async signInWithGoogleRedirect(): Promise<void> {
    await this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  async signOut(): Promise<void> {
    await this.afAuth.auth.signOut();
  }
}
