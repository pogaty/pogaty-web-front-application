import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { ProblemFeedsComponent } from '../components/problem-feeds/problem-feeds.component';

@NgModule({
  declarations: [
    AppComponent,ProblemFeedsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
