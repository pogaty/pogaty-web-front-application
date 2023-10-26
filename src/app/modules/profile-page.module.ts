import { NgModule } from '@angular/core';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { CategoryComponent } from '../components/profile-page/category/category.component';

@NgModule({
  declarations: [ProfilePageComponent, CategoryComponent],
  exports: [ProfilePageComponent, CategoryComponent],
})
export class ProfilePageModule {}
