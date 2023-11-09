import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollabServiceComponent } from '../components/collab-service/collab-service.component';
import { CollabProfileComponent } from '../components/collab-profile/collab-profile.component';

@NgModule({
  declarations: [CollabServiceComponent, CollabProfileComponent],
  exports: [CollabServiceComponent, CollabProfileComponent],
  imports: [CommonModule, FormsModule],
})
export class CollabServiceModule {}
