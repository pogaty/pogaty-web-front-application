import { LocalizedString } from '@angular/compiler';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

    constructor(
      private dataService: DataService
    ) {}
    
    content: string = ''

    onKeyDown(content: string) {
        if (content) {
          this.dataService.setProblemOpen(true)
          this.dataService.setProblemContent(content)
        }    
    }
}
