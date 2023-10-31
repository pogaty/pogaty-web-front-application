import { Component, OnInit } from '@angular/core';

import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service.';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data = localStorage.getItem('userInfo');
  isLoading: boolean = false;
  userData: Client | null;

  constructor(private clientService: ClientService) {
    this.userData = null;
  }

  ngOnInit(): void {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const username = userInfo.username;

      this.clientService.loadUsers(username).then((data) => {
        this.userData = data;
      });
    }
  }
}
