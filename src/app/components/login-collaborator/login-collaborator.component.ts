import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-collaborator',
  templateUrl: './login-collaborator.component.html',
  styleUrls: ['./login-collaborator.component.css'],
})
export class LoginCollaboratorComponent {
  isRegistered = true;
  errorlog: string = ''

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  authorization(collabName: string, password: string) {
    this.collaboratorService.loadUserCollabs(collabName).then((info) => {
      console.log (info)
      if (info != null) {
        if (info.password == password) {
          localStorage.setItem('collabInfo', JSON.stringify(info))
          this.router.navigate(['/collab-service'])
          this.errorlog = ''
        } else {
          this.errorlog = 'password is incorrect!'
        }
      } else {
        this.errorlog = 'username is invalidated.'
      }
    });
  }

  openCreateAccountPopup() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
