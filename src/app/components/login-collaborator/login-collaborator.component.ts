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

  authorization(collabName: string, password: string) {
    this.collaboratorService.loadUserCollabs(collabName).then((info) => {
      console.log(info); // inthis line info.password is 123456789
      if (info != null) {
        info.password = password;
        info.name = collabName;
        console.log('in if 1');
        console.log(info.password); // but in this line info.password is undefined
        console.log(password);
        if (info.password == password) {
          localStorage.setItem('collabInfo', JSON.stringify(info));
          this.router.navigate(['/collab-service']);
        } else {
          console.log('password is incorrect!');
        }
      } else {
        console.log('username is invalidated.');
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
