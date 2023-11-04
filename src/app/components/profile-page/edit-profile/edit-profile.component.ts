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
  modifiedGender: string | undefined = '';
  modifiedMail: string | undefined = '';
  modifiedTel: string | undefined = '';
  modifiedAddress: string | undefined = '';

  defaultImage = './assets/images/user-profile-samples/profile-1.png';

  userData: Client | null;
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

          console.log(this.userData.fileImage);

          this.modifiedUsername = this.userData.username;
          this.modifiedFname = this.userData.firstname;
          this.modifiedLname = this.userData.lastname;
        }
      });
    }
  }

  private updateUser(
    username: string | undefined,
    fname: string | undefined,
    lname: string | undefined,
    tel: string | undefined,
    mail: string | undefined,
    gender: string | undefined,
    address: string | undefined
  ) {
    if (this.data && this.userData) {
      const userInfo = JSON.parse(this.data);
      const client_id = userInfo.client_id;

      // Update the description of the userData
      this.userData.username = username;
      this.userData.firstname = fname;
      this.userData.lastname = lname;
      this.userData.phoneNumber = tel;
      this.userData.mail = mail;
      this.userData.gender = gender;
      this.userData.address = address;

      // Call the update method
      this.clientService.updateUser(client_id, this.userData);
    }
  }

  handleFileInput(event: any) {
    const selectedFile = event.target.files[0];

    // Process the selected file, e.g., upload it to the server or display it.
    // You can access the selected file using 'selectedFile'.
  }

  onClickSave() {
    this.updateUser(
      this.modifiedUsername,
      this.modifiedFname,
      this.modifiedLname,
      this.modifiedTel,
      this.modifiedMail,
      this.modifiedGender,
      this.modifiedAddress
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
    this.modifiedTel = this.userData?.phoneNumber;
    this.modifiedMail = this.userData?.mail;
    this.modifiedGender = this.userData?.gender;
    this.modifiedAddress = this.userData?.address;
    this.isShow = false;
    this.editInfo = true;
  }
}
