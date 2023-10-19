import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { ProblemFeedsComponent } from '../components/problem-feeds/problem-feeds.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,ProblemFeedsComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
