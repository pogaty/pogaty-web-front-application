import { NgModule } from '@angular/core';

import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ExhibitionComponent } from '../components/profile-page/exhibition/exhibition.component';

@NgModule({
  declarations: [ProfilePageComponent, ExhibitionComponent],
  exports: [ProfilePageComponent, ExhibitionComponent],
})
export class ProfilePageModule {}
