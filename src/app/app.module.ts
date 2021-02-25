import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { StoriesTableComponent } from './components/stories-table/stories-table.component';
import { StoriesService } from './services/stories.service';
import { CommonModule } from '@angular/common';
import { StoriesTableRowComponent } from './components/stories-table/stories-table-row/stories-table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesTableComponent,
    StoriesTableRowComponent
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
