import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/application/app.component';
import { SharedModule } from './shared.module';
import { ProblemFeedsModule } from './problem-feeds.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login.module';
import { AppLayoutComponent } from '../components/application/app-layout/app-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home.module';
import { ProfilePageModule } from './profile-page.module';
import { IdeaPageModule } from './idea-page.module';
import { FormsModule } from '@angular/forms';
import { IdeaDashboardModule } from './idea-dashboard.module';

@NgModule({
  declarations: [
    AppComponent, 
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
    SharedModule,
    HomeModule,
    ProfilePageModule,
    ProblemFeedsModule,
    AppRoutingModule,
    LoginModule,
    IdeaPageModule,
    IdeaDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
