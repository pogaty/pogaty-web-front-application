import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  isLoading: boolean = false
  selectedCategory =  null
  problems: Problem[] = []
  problemTimeAgoMap: { [key: number]: string } = {};
  private categorySubscription: Subscription | undefined

  @Output() ideaData: EventEmitter<Idea[] | undefined> = new EventEmitter<Idea[] | undefined>();

  constructor( 
    private dataService: DataService,
    private problemService: ProblemService
  ) { }

  ngOnInit(): void {
    this.categorySubscription = this.dataService.getProblemsCategory()
      .subscribe((data) => {
        (data == 'global') ? this.selectedCategory = null : this.selectedCategory = data
        console.log(`-dts tools -received ${this.selectedCategory}`)

        this.renderProblemsByCategory(this.selectedCategory).then(() => {
          this.problems.forEach((problem) => {
            this.renderTimedAgo(problem)
          })
        })
      }
    )
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  toggleIdeas(problem: Problem): void {
    problem.idea_visible = !problem.idea_visible
    console.log(`-obj feeds -recieved ${problem.topic} has ${problem.idea_visible}`)

    if (problem.idea_visible) {
      this.ideaData.emit(problem.ideas)
    }
  }

  async renderProblemsByCategory(community: string | null): Promise<void> {
    try {
      this.isLoading = true
        if (community) {
          this.problems = await this.problemService.loadProblemsByCategory(community)
        } else {
          this.problems = await this.problemService.loadProblems()
        }
    
      console.log(this.problems)
    } finally {
      this.isLoading = false
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
