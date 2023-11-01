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
}
