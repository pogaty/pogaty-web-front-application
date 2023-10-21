import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegistered = true

  toggleRegistered(): void {
    this.isRegistered = !this.isRegistered
    console.log(this.isRegistered)
  }
}
