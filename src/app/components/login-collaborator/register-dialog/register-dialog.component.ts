import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Collaborator } from 'src/app/models/collaborator.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent {
  collaborator: Collaborator | undefined;
  errorlog: string = ''

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private registrationService: CollaboratorService,
    private dataService: DataService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  registerCollaborator(name: string, email: string, pass: string) {
    const collab: Collaborator = {
      email: email,
      password: pass,
      name: name,
    }

    this.registrationService.createCollaborator(collab)
    .then(() => { 
      this.onClose() 
      this.errorlog = ''
    }).catch((err) => {
      this.errorlog = err
    })
  }
}
