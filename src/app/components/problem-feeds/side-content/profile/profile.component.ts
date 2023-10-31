import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: Client | undefined

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('userInfo')
    if (data)
    this.userData = JSON.parse(data)
  }

  profilePage() {
    this.router.navigate(['/profile'])
  }
}
