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

  defaultImage = './assets/images/user-profile-samples/profile-1.png';
  variable = '';

  constructor(private clientService: ClientService) {
    this.userData = null;
  }

  ngOnInit(): void {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const username = userInfo.username;

      this.clientService.loadUsers(username).then((data) => {
        this.userData = data;

        if (this.userData) {
          // Check if userData is not null
          this.variable = this.clientService.getPicture(
            this.userData.fileImage
          );

          if (this.userData.fileImage == null) {
            console.log('this method work');
            this.userData.fileImage = this.defaultImage;
          } else if (this.variable) {
            // Check if variable is not null
            this.userData.fileImage = this.variable;
          }
        }
      });
    }
  }
}
