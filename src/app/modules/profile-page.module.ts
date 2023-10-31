import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ExhibitionComponent } from '../components/profile-page/exhibition/exhibition.component';
import { CategoryComponent } from '../components/profile-page/category/category.component';
import { ProfileComponent } from '../components/profile-page/profile/profile.component';
import { DescriptionComponent } from '../components/profile-page/description/description.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ExhibitionComponent,
    CategoryComponent,
    ProfileComponent,
    DescriptionComponent,
  ],
  exports: [
    ProfilePageComponent,
    ExhibitionComponent,
    CategoryComponent,
    ProfileComponent,
    DescriptionComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ProfilePageModule {}
