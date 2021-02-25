import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { StoriesComponent } from './stories/stories.component';
import { StoriesService } from './stories/stories.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [StoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
