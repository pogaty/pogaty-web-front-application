import { Component } from '@angular/core';

@Component({
  selector: 'app-side-content',
  template: `
    <div class="container-fluid">
      <app-profile></app-profile>
      <app-announce></app-announce>
      <app-recommend></app-recommend>
    </div>
  `,
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent {

}
