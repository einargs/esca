import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";

import { OAuthService } from "./o-auth.service";
console.log("test");

@Injectable()
export class ElectronOAuthService extends OAuthService {
  private isAccessTokenListenerSetup: boolean = false;

  constructor(
    private electron: ElectronService,
    private afAuth: AngularFireAuth
  ) {
    super();
    this.listenForAccessToken();
  }

  private listenForAccessToken(): void {
    if (!this.isAccessTokenListenerSetup) {
      //TODO: Convert to an observable-based system
      this.electron.ipcRenderer.on("got-access-token", (event, type, token) => {
        if (type !== "google") {
          throw new Error("non-google oauth is not supported");
        }
        const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
        this.afAuth.auth.signInWithCredential(credential);
      });
      this.isAccessTokenListenerSetup = true;
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.electron.ipcRenderer.send("get-access-token", "google");
  }
}
console.log("ELECTRON");
