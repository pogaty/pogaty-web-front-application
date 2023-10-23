import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  constructor(private dataService: DataService) { }

  assignCategory(category: string) {
    this.dataService.setProblemsCategory(category)
  }
}
