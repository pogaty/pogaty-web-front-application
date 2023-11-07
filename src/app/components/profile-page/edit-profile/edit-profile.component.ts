import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  selectedFile: File | null = null;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  imageName: any;

  userData: Client | undefined;
  variable = '';

  constructor(
    private clientService: ClientService,
    private location: Location
  ) {
    this.userData = undefined;
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
        }
      });
    }
  }

  private updateUser(
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
    // Retrieve the selected file from the input event
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadFile(): void {
    if (this.data && this.userData) {
      const userInfo = JSON.parse(this.data);
      const client_id = userInfo.client_id;
      if (this.selectedFile) {
        this.clientService
          .updateClientImage(client_id, this.selectedFile)
          .subscribe(
            (response) => {
              this.retrieveResonse = response;
              this.message = 'Image uploaded successfully';
              this.retrieveResonse = response;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            },
            (error) => {
              console.error(error);
              this.message = 'Could not upload the image';
            }
          );
      }
      window.location.reload();
    }
  }

  onClickSave() {
    this.updateUser(
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
