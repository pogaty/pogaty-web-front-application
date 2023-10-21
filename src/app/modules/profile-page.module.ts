import { NgModule } from '@angular/core';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ProfileComponent } from '../components/profile-page/profile/profile.component';

@NgModule({
  declarations: [ProfilePageComponent,ProfileComponent],
  exports: [ProfilePageComponent,ProfileComponent],
})
export class ProfilePageModule {}
