import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false
  CurrentUser: Client | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.isLogin)
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      this.isLogin = true
      this.CurrentUser == JSON.parse(userInfo)
    }
  }

  logout() {
    this.CurrentUser = undefined
    localStorage.clear()
    this.isLogin = false
    this.router.navigate(['/login'])
  }


}
