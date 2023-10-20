import { NgModule } from '@angular/core';

import { HomeComponent } from '../components/home/home.component';
import { Content1Component } from '../components/home/content1/content1.component';
import { Content2Component } from '../components/home/content2/content2.component';
import { Content3Component } from '../components/home/content3/content3.component';

@NgModule({
  declarations: [
    HomeComponent,
    Content1Component,
    Content2Component,
    Content3Component,
  ],
  exports: [HomeComponent, Content1Component, Content2Component],
})
export class HomeModule {}
