import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [AboutPageComponent]
})
export class AboutModule { }
