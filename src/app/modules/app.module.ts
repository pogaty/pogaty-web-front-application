import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { SharedModule } from './shared.module';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, HomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
