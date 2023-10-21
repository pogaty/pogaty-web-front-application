import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  template: `
    <div class="container-fluid">
      <app-post></app-post>
      <app-feeds></app-feeds>
    </div>
  `,
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {

}
