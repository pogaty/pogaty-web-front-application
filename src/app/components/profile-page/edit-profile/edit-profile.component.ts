import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service.';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  data = localStorage.getItem('userInfo');

  editInfo = false;
  editPicture = false;
  isShow = true;

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

      this.modifiedUsername = this.userData?.username;
      this.modifiedFname = this.userData?.firstname;
      this.modifiedLname = this.userData?.lastname;
    }
  }

  private updateUser(
    username: string | undefined,
    fname: string | undefined,
    lname: string | undefined
  ) {
    if (this.data && this.userData) {
      const userInfo = JSON.parse(this.data);
      const client_id = userInfo.client_id;

      // Update the description of the userData
      this.userData.username = username;
      this.userData.firstname = fname;
      this.userData.lastname = lname;

      // Call the update method
      this.clientService.updateUser(client_id, this.userData);
    }
  }

  onClickSave() {
    this.updateUser(
      this.modifiedUsername,
      this.modifiedFname,
      this.modifiedLname
    );
    this.isShow = true;
    this.editInfo = false;
    this.editPicture = false;
  }

  onClickEditPic() {}

  onClickEditname() {
    this.modifiedUsername = this.userData?.username;
    this.modifiedFname = this.userData?.firstname;
    this.modifiedLname = this.userData?.lastname;
    this.isShow = false;
    this.editInfo = true;
  }
}
