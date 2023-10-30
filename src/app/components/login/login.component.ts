import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service.';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegistered = true

  constructor(
    private clientService: ClientService,
    private dataService: DataService,
    private router: Router,
  ) { }

  authorization(username: string, password: string) {
    this.clientService.loadUsers(username).then((info) => {
      console.log(info)
      if (info != null) {
        if (info.password == password) {
          localStorage.setItem('userInfo', JSON.stringify(info))
          this.router.navigate(['/problem'])
        } else {
          console.log('password is incorrect!')
        }
      } else {
        console.log('username is invalidated.')
      }
    })
  }

  toggleRegistered(): void {
    this.isRegistered = !this.isRegistered
    console.log(this.isRegistered)
  }

  refreshDash() {
    this.dataService.setCurrentPage("feeds")
  }
}
