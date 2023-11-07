import { LocalizedString } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
    data = localStorage.getItem("userInfo")
    
    constructor(
      private dataService: DataService,
      private router: Router
    ) {}
    
    content: string = ''

    onKeyDown(content: string) {
      const data = localStorage.getItem("userInfo")
      if (data) {
        if (content) {
          this.dataService.setProblemOpen(true)
          this.dataService.setProblemContent(content)
        }    
      } else {
        this.router.navigate(['/login'])
      }
    }

    getClient(): string {
      if (this.data) {
        const user = JSON.parse(this.data);
        console.log(user.fileImage);
        return `http://localhost:8000/clients/${user.client_id}/image`;
      } else {
        return '../../../../../assets/images/user-profile-samples/sample-unlogin.png';
      }
    }
}
