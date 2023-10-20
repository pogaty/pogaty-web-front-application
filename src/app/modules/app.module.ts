import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { SharedModule } from './shared.module';
import { HomeModule } from './home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
