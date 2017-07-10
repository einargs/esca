import "hammerjs";

import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from "@angular/forms";

import { AppComponent }           from './app.component';
import { AppToolbarComponent }    from './app-toolbar/app-toolbar.component';
import { AppNavComponent }        from './app-nav/app-nav.component';
import { AppUserCtrlComponent }   from "./app-user-ctrl.component";
import { NotFoundComponent }      from "./not-found.component";

import { ImportsModule }          from './imports/imports.module';
import { FireSetupModule }        from "./fire-setup.module";
import { RecipesModule }          from "./recipes/recipes.module";
import { AppRoutingModule }       from "./app-routing.module";
import { UserService }            from "./user/user.service";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    FireSetupModule,
    ImportsModule,
    RecipesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    AppToolbarComponent,
    AppNavComponent,
    AppUserCtrlComponent
  ],
  providers: [
    UserService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
