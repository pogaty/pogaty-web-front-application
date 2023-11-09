import { Component } from '@angular/core';

import { CollaboratorService } from 'src/app/services/collaborator.service';
import { Collaborator } from 'src/app/models/collaborator.model';

@Component({
  selector: 'app-collab-profile',
  templateUrl: './collab-profile.component.html',
  styleUrls: ['./collab-profile.component.css'],
})
export class CollabProfileComponent {
  data = localStorage.getItem('collabInfo');
  collabData: Collaborator | null;

  isedit = false;

  selectedFile: File | null = null;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  imageName: any;
  variable = '';
  defaultImage = './assets/images/user-profile-samples/profile-1.png';

  constructor(private collabService: CollaboratorService) {
    this.collabData = null;
  }

  ngOnInit(): void {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const collab_name = userInfo.name;

      this.collabService.loadUserCollabs(collab_name).then((data) => {
        this.collabData = data;
      });
    }
  }

  handleFileInput(event: any) {
    // Retrieve the selected file from the input event
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadFile(): void {
    if (this.data && this.collabData) {
      const userInfo = JSON.parse(this.data);
      const collab_id = userInfo.collab_id;
      if (this.selectedFile) {
        this.collabService
          .updateCollabsImage(collab_id, this.selectedFile)
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
      // window.location.reload();
    }
  }

  onClickEdit() {
    this.isedit = true;
  }

  onClickUpload() {
    this.uploadFile();
    this.isedit = false;
  }
}
