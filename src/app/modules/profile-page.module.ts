import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ExhibitionComponent } from '../components/profile-page/exhibition/exhibition.component';
import { CategoryComponent } from '../components/profile-page/category/category.component';
import { ProfileComponent } from '../components/profile-page/profile/profile.component';
import { DescriptionComponent } from '../components/profile-page/description/description.component';
import { EditProfileComponent } from '../components/profile-page/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ExhibitionComponent,
    ProfileComponent,
    DescriptionComponent,
    EditProfileComponent,
  ],
  exports: [
    ProfilePageComponent,
    ExhibitionComponent,
    CategoryComponent,
    ProfileComponent,
    DescriptionComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    CategoryComponent,
  ],
})
export class ProfilePageModule {}
