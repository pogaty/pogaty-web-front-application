import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Idea } from 'src/app/models/idea.model';
import { Problem } from 'src/app/models/problem.model';
import { DataService } from 'src/app/services/data.service';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit, OnDestroy {
  data = localStorage.getItem("userInfo");
  isLoading: boolean = false

  selectedCategory =  null
  selectedFilter = null

  categorySubscription: Subscription | undefined
  filterSubscription: Subscription | undefined

  problems: Problem[] = []
  filtered_problems: Problem[] = []
  problemTimeAgoMap: { [key: number]: string } = {}

  @Output() ideaData: EventEmitter<Idea[] | undefined> = new EventEmitter<Idea[] | undefined>()
  @Output() problemData: EventEmitter<Problem> = new EventEmitter<Problem>()

  constructor( 
    private dataService: DataService,
    private problemService: ProblemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categorySubscription = this.dataService.getProblemsCategory()
      .subscribe((data) => {
        (data == 'global') ? this.selectedCategory = null : this.selectedCategory = data
        console.log(`-dts tools -category ${this.selectedCategory}`)

        this.renderProblemsByCategory(this.selectedCategory).then(() => {
          this.problems.forEach((problem) => {
            this.renderTimedAgo(problem)
          })
        })
      }
    )

    this.filterSubscription = this.dataService.getFilterProblems()
    .subscribe((data) => {
      this.selectedFilter = data
      console.log(`-dts tools -filter ${this.selectedFilter}`)

      this.renderFilterFactor(this.selectedFilter)
    })

  

    if (this.data) {
      this.problemService.loadProblemByMark(JSON.parse(this.data).client_id).then(data => {
        this.dataService.setMarkProblems(data)
        console.log(this.dataService.getMarkProblems())
      }).catch(() => {
        this.dataService.setMarkProblems([])
      })
    }
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe()
    }

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe()
    }
  }

  getPage() {
    return this.dataService.getCurrentPage()
  }

  toggleIdeas(problem: Problem): void {
    problem.idea_visible = !problem.idea_visible
    console.log(`-obj feeds -recieved ${problem.topic} has ${problem.idea_visible}`)

    if (problem.idea_visible) {
      this.ideaData.emit(problem.ideas)
      this.problemData.emit(problem)
    }
  }

  async renderProblemsByCategory(community: string | null): Promise<void> {
    try {
      this.isLoading = true
        if (this.getPage() == 'feeds') {
          if (community) {
            this.problems = await this.problemService.loadProblemsByCategory(community)
          } else {
            this.problems = await this.problemService.loadProblems()
          }
        }

        else if (this.getPage() == 'mark_problems') {
          const data = localStorage.getItem("userInfo");
          if (!data) {
            this.router.navigate(['/login'])
          } else {
            this.problems = await this.problemService.loadProblemByMark(JSON.parse(data).client_id)
          }
        }
        
      
      this.filtered_problems = this.problems
      console.log(this.problems)
    } finally {
      this.isLoading = false
    }
  }

  renderFilterFactor(filter: string | null) {
    if (filter) {
      console.log(filter)
      this.problems = this.filtered_problems.filter((problem) => {
        return problem.topic?.toLowerCase().includes(filter.toLowerCase())
      })
    }
    
    
  }

  renderTimedAgo(problem: Problem) {
    this.problemService.loadTimedAgoByProblemId(problem.problem_id)
      .then((time) => {
        this.problemTimeAgoMap[problem.problem_id] = time
      }
    )
  }


}
