import { NgModule }                   from "@angular/core";
import { AngularFireModule }          from "angularfire2";
import { AngularFireAuthModule }      from "angularfire2/auth";
import { AngularFireDatabaseModule }  from "angularfire2/database";
import { environment }                from "../environments/environment";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, "esca"),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class FireSetupModule {}
