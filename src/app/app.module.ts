import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { LinkContainerComponent } from './link-container/link-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkButtonComponent,
    LinkContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
