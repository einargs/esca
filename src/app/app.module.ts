import "hammerjs";

import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from "@angular/forms";
import { ServiceWorkerModule }          from "@angular/service-worker";
import { NgxElectronModule }            from "ngx-electron";

import { AppComponent }                 from './app.component';
import { AppToolbarComponent }          from './app-toolbar/app-toolbar.component';
import { AppNavComponent }              from './app-nav/app-nav.component';
import { UserCtrlComponent }            from "./user/user-ctrl.component";
import { NotFoundComponent }            from "./not-found.component";

import { LocalSignInDialogComponent }   from "./user/local-sign-in-dialog.component";
import { LocalSignUpDialogComponent }   from "./user/local-sign-up-dialog.component";
import { SignInLandingDialogComponent } from "./user/sign-in-landing-dialog.component";

import { ImportsModule }                from './imports/imports.module';
import { FireSetupModule }              from "./fire-setup.module";
import { UserModule }                   from "./user/user.module";
import { AppRoutingModule }             from "./app-routing.module";
import { UserService }                  from "./user/user.service";
import { environment }                  from "../environments/environment";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    FireSetupModule,
    ImportsModule,
    UserModule,
    ...(environment.platform === "electron" ? [NgxElectronModule] : []),
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production && (environment.platform == "web")
    }),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    AppToolbarComponent,
    AppNavComponent,
    UserCtrlComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
