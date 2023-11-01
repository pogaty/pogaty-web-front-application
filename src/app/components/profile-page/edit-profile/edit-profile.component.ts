import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service.';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  data = localStorage.getItem('userInfo');
  isLoading: boolean = false;

  modifiedUsername: string | undefined = '';
  modifiedFname: string | undefined = '';
  modifiedLname: string | undefined = '';

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

    this.modifiedUsername = this.userData?.username;
    console.log(this.modifiedUsername);
  }

  private updateUser(
    client_id: number | undefined,
    username: string | undefined,
    fname: string | undefined,
    lname: string | undefined
  ) {
    if (this.data && this.userData) {
      const userInfo = JSON.parse(this.data);
      const client_id = userInfo.client_id;

      this.userData.username = username;
      this.userData.firstname = fname;
      this.userData.lastname = lname;

      this.clientService.updateUser(client_id, this.userData);

      this.modifiedUsername = userInfo.username;
      this.modifiedFname = userInfo.firstname;
      this.modifiedLname = userInfo.lastname;
    }
  }

  onClickSave() {
    this.updateUser(
      this.userData?.client_id,
      this.modifiedUsername,
      this.modifiedFname,
      this.modifiedLname
    );
  }
}
