import { NgModule } from '@angular/core';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { DescriptionComponent } from '../components/profile-page/description/description.component';

@NgModule({
  declarations: [ProfilePageComponent,DescriptionComponent],
  exports: [ProfilePageComponent,DescriptionComponent],
})
export class ProfilePageModule {}
