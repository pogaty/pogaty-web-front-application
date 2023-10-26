import { NgModule } from '@angular/core';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { CategoryComponent } from '../components/profile-page/category/category.component';
import { ProfileComponent } from '../components/profile-page/profile/profile.component';
import { DescriptionComponent } from '../components/profile-page/description/description.component';

@NgModule({
  declarations: [ProfilePageComponent, CategoryComponent,ProfileComponent,DescriptionComponent],
  exports: [ProfilePageComponent, CategoryComponent,ProfileComponent,DescriptionComponent],
})
export class ProfilePageModule {}
