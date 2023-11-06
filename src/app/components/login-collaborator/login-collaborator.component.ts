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

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  authorization(name: string, password: string) {
    this.collaboratorService.loadUsers(name).then((infomation) => {
      console.log(infomation?.password);
      if (infomation) {
        console.log(infomation.password + ' ' + password);
        if (infomation.password == password) {
          localStorage.setItem('collabInfo', JSON.stringify(infomation));
          this.router.navigate(['/collab-service']);
        } else {
          console.log('Password is incorrect!');
        }
      } else {
        console.log('Username is invalid.');
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
