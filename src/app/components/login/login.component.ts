import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service.';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegistered = true
  errorlog = ''

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
          this.errorlog = ''
          this.router.navigate(['/problem'])
        } else {
          this.errorlog = 'password is incorrect!'
        }
      } else {
        this.errorlog = 'username is invalidated!'
      }
    })
  }

  registerClient(username: string, email: string, password: string) {
    if (!username || !email || !password) {
      this.errorlog = "Every fields must contain the require content."
    } else {
      const client: Client = {
        username: username,
        password: password,
        mail: email
      }
  
      this.clientService.createClient(client).then(() => {
        this.errorlog = ''
        this.isRegistered = true
      }).catch((error) => {
        this.errorlog = error
      })
    }
  }

  toggleRegistered(): void {
    this.isRegistered = !this.isRegistered
    console.log(this.isRegistered)
  }

  refreshDash() {
    this.dataService.setCurrentPage("feeds")
  }


}
