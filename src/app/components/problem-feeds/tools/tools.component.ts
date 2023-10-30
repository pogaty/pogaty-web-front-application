import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  category: string = 'global'
  searchFilter = ''

  constructor(private dataService: DataService) { 
    console.log(this.category)
  }

  assignCategory(category: string) {
    this.dataService.setProblemsCategory(category)
    this.category = category
  }

  setPage(page: string) {
    this.dataService.setCurrentPage(page)
  }

  setProblemFilter(filter: string | null) {
    (filter) ? this.dataService.setFilterProblems(filter) : this.dataService.setProblemsCategory(this.category)
  }

  // setPageFeed() {
  //   this.dataService.setCurrentPage('feed')
  //   window.location.reload()
  // }
}
