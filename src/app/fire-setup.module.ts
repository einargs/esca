import { NgModule }                   from "@angular/core";
import { AngularFireModule }          from "angularfire2";
import { AngularFireAuthModule }      from "angularfire2/auth";
import { AngularFirestoreModule }  from "angularfire2/firestore";
import { environment }                from "../environments/environment";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, "esca"),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class FireSetupModule {}
