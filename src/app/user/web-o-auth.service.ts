import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { OAuthService } from "./o-auth.service";

@Injectable()
export class WebOAuthService extends OAuthService {
  constructor(
    private afAuth: AngularFireAuth
  ) {
    super();
  }

  async signInWithGoogle(): Promise<void> {
    await this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
console.log("WEB");
