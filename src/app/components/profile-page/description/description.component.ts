import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service.';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  data = localStorage.getItem('userInfo');

  isLoading: boolean = false;
  isEdit = false;
  isShow = true;

  modifiedDescription: string | undefined = '';

  userData: Client | undefined;

  constructor(private clientService: ClientService) {
    this.userData = undefined;
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

  private updateUser(
    client_id: number | undefined,
    description: string | undefined
  ) {
    if (this.data && this.userData) {
      const userInfo = JSON.parse(this.data);
      const client_id = userInfo.client_id;

      // Update the description of the userData
      this.userData.description = description;

      // Call the update method
      this.clientService.updateUser(client_id, this.userData);

      this.modifiedDescription = userInfo.description;
    }
  }

  onClickEdit() {
    this.modifiedDescription = this.userData?.description;
    this.isEdit = true;
    this.isShow = false;
  }

  onClickSave() {
    this.updateUser(this.userData?.client_id, this.modifiedDescription);
    this.isEdit = false;
    this.isShow = true;
  }

  onClickCancel() {
    this.isEdit = false;
    this.isShow = true;
  }
}
