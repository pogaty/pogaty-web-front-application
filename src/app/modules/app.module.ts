import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { SharedModule } from './shared.module';
import { ProblemFeedsModule } from './problem-feeds.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProblemFeedsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
