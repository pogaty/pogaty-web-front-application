import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { SharedModule } from './shared.module';
import { ProfilePageModule } from './profile-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, ProfilePageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
