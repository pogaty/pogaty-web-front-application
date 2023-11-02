import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';

@Component({
  selector: 'app-login-collaborator',
  templateUrl: './login-collaborator.component.html',
  styleUrls: ['./login-collaborator.component.css']
})
export class LoginCollaboratorComponent {
  isRegistered = true
  isPopupOpen: boolean = false;
  
  constructor(
    private CollaboratorService: CollaboratorService,
    private router: Router,
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
  

  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
  }
}
