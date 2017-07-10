import { Observable }       from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Injectable }       from '@angular/core';
import { AngularFireAuth }  from "angularfire2/auth";
import * as firebase        from "firebase/app";

import { User }             from "./user";

@Injectable()
export class UserService {
  user: Observable<User>;
  private actualUser: User; //TODO: Refactor this mess to use observables properly (however the hell that is)

  get signedIn(): boolean {
    return Boolean(this.actualUser);
  }

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState.map(user => user ? new User(user.uid) : null);

    this.user.subscribe(user => {
      this.actualUser = user;
    });
  }

  // Get the user
  async getUser(): Promise<User> {
    return this.signedIn ? this.actualUser : null;
  }

  // Get the user id
  async getUserId(): Promise<string> {
    return this.signedIn ? this.actualUser.id : null;
  }
}
