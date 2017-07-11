import { Observable }       from "rxjs/Observable";
import { BehaviorSubject }  from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/multicast';

import { Injectable }       from '@angular/core';
import { AngularFireAuth }  from "angularfire2/auth";
import * as firebase        from "firebase/app";

import { User }             from "./user";

@Injectable()
export class UserService {
  //TODO: Refactor this mess to use rxjs properly (however that is)
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  user: User;
  userIdSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  userId: string;
  signedIn: boolean;

  constructor(private afAuth: AngularFireAuth) {
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
}
