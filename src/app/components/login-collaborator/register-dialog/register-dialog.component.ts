import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Collaborator } from 'src/app/models/collaborator.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent {
  collaborator: Collaborator | undefined;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private registrationService: CollaboratorService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  registerCollaborator() {
    this.registrationService.createNewCollaborator(this.collaborator);
  }
}
