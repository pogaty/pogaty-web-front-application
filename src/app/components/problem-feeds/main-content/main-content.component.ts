import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  constructor(public dataService: DataService) {}
  
  getPage() {
    return this.dataService.getCurrentPage()
  }
}
