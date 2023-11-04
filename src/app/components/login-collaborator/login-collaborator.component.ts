import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-collaborator',
  templateUrl: './login-collaborator.component.html',
  styleUrls: ['./login-collaborator.component.css']
})
export class LoginCollaboratorComponent {
  isRegistered = true

  
  constructor(
    private CollaboratorService: CollaboratorService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  
  
  authorization(email: string, password: string) {
    this.CollaboratorService.loadUsers(email).then((info) => {
      console.log(info)
      if (info != null) {
        if (info.password == password) {
          localStorage.setItem('userInfo', JSON.stringify(info))
          this.router.navigate(['/service']) //service
        } else {
          console.log('password is incorrect!')
        }
      } 
    })
  }

  openCreateAccountPopup() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
