import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data = localStorage.getItem("userInfo")
  isLogin = false
  CurrentUser: Client | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(`navbar -logStat ${this.isLogin}`)
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      this.isLogin = true
      this.CurrentUser == JSON.parse(userInfo)
    }
  }

  getClient(): string | undefined {
    if (this.data) {
      const user = JSON.parse(this.data)
      return `http://localhost:8000/clients/${user.client_id}/image`
    }

    return undefined
  }

  logout() {
    this.CurrentUser = undefined
    localStorage.clear()
    this.isLogin = false
    this.router.navigate(['/login'])
  }
}
