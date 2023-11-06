import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollabServiceComponent } from '../components/collab-service/collab-service.component';

@NgModule({
  declarations: [CollabServiceComponent],
  exports: [CollabServiceComponent],
  imports: [CommonModule, FormsModule],
})
export class CollabServiceModule {}
