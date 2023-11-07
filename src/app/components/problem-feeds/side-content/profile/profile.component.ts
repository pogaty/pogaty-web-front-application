import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: Client | undefined
  data = localStorage.getItem('userInfo')

  getImg = () => this.dataService.getClient((this.data) ? this.data : '')

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('userInfo')
    if (data)
    this.userData = JSON.parse(data)
  }

  profilePage() {
    this.router.navigate(['/profile'])
  }

}
