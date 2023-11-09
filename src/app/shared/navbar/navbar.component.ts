import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Collaborator } from 'src/app/models/collaborator.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data = localStorage.getItem("userInfo")
  isLogin = false
  onCollab = false
  CurrentUser: Client | Collaborator | undefined
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(`navbar -logStat ${this.isLogin}`)
    const userInfo = localStorage.getItem('userInfo')
    const collabInfo = localStorage.getItem('collabInfo')

    if (userInfo) {
      this.isLogin = true
      this.onCollab = false
      this.CurrentUser == JSON.parse(userInfo)
    }

    if (collabInfo) {
      this.isLogin = true
      this.onCollab = true
      this.CurrentUser = JSON.parse(collabInfo)
    }
  }

  getClient(): string | undefined {
    if (this.data) {
      const user = JSON.parse(this.data)
      return `http://localhost:8000/clients/${user.client_id}/image`
    }

    return undefined
  }

  logout(type: string) {
    this.CurrentUser = undefined
    localStorage.clear()
    this.isLogin = false
    
    if (type == 'collab') {
      this.onCollab = false
      this.router.navigate(['/login-collaborator'])
    } else {
      this.router.navigate(['/login'])
    }
  }
}
