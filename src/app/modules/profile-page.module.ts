import { NgModule } from '@angular/core';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { CategoryComponent } from '../components/profile-page/category/category.component';
import { ProfileComponent } from '../components/profile-page/profile/profile.component';

@NgModule({
  declarations: [ProfilePageComponent, CategoryComponent,ProfileComponent],
  exports: [ProfilePageComponent, CategoryComponent,ProfileComponent],
})
export class ProfilePageModule {}
