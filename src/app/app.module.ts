import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { LinkContainerComponent } from './link-container/link-container.component';
import { WikipediaService } from './wikipedia-service.service';
import { HttpClientModule } from '@angular/common/http';
import { GameDisplayComponent } from './game-display/game-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkButtonComponent,
    LinkContainerComponent,
    GameDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WikipediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
