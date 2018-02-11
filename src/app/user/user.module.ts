import { NgModule, ModuleWithProviders }  from "@angular/core";
import { CommonModule }                   from "@angular/common";
import { FormsModule }                    from "@angular/forms";

import { MaterialImportsModule }          from "../imports/material-imports.module";
import { environment }                    from "../../environments/environment";

import { LocalSignInDialogComponent }     from "./local-sign-in-dialog.component";
import { LocalSignUpDialogComponent }     from "./local-sign-up-dialog.component";
import { SignInLandingDialogComponent }   from "./sign-in-landing-dialog.component";
import { UserService }                    from "./user.service";
import { OAuthService }                   from "./o-auth.service";
import { WebOAuthService }                from "./web-o-auth.service";
import { ElectronOAuthService }           from "./electron-o-auth.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialImportsModule
  ],
  declarations: [
    LocalSignInDialogComponent,
    LocalSignUpDialogComponent,
    SignInLandingDialogComponent
  ],
  providers: [
    UserService,
    {provide: OAuthService, useClass: (environment.platform == "electron") ? ElectronOAuthService : WebOAuthService}
  ],
  entryComponents: [
    LocalSignInDialogComponent,
    LocalSignUpDialogComponent,
    SignInLandingDialogComponent
  ]
})
export class UserModule {
/*  static forRoot(platform: string): ModuleWithProviders {
    if (platform === "web") return {
      ngModule: UserModule,
      providers: [
        UserService,
        {provide: OAuthService, useClass: WebOAuthService}
      ]
    }; else if (platform === "electron") return {
      ngModule: UserModule,
      providers: [
        UserService,
        {provide: OAuthService, useClass: ElectronOAuthService}
      ]
    };
  }*/
}
