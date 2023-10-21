import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class AppLayoutComponent {

}
