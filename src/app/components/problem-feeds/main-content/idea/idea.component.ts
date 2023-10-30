import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Agreement } from 'src/app/models/agreement.model';
import { Idea } from 'src/app/models/idea.model';
import { Problem } from 'src/app/models/problem.model';
import { AgreementService } from 'src/app/services/agreement.service';
import { DataService } from 'src/app/services/data.service';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit, OnChanges {
  data = localStorage.getItem('userInfo');
  @Input() ideas: Idea[] | undefined
  @Input() problem: Problem | undefined
  mark_problems: Problem[] = []

  agreeMap: { [key: number]: number } = {};
  disagreeMap : { [key: number]: number } = {};

  constructor(
    private dataService: DataService,
    private agreementService: AgreementService,
    private problemService: ProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mark_problems = this.dataService.getMarkProblems()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ideas) {
      this.ideas.forEach(idea => {

        //agree rendering logic.
        this.agreementService.loadAgreeReactions(idea.idea_id).then(data => {
          this.agreeMap[idea.idea_id] = data.length
        })

        //disagree rendering logic.
        this.agreementService.loadDisagreeReactions(idea.idea_id).then(data => {
          this.disagreeMap[idea.idea_id] = data.length
        })
      })
    }

    // console.log (this.agreeMap)
    // console.log (this.disagreeMap)
  }

  isMark(problem_id: number | undefined): boolean {
    return (problem_id) ? !!this.mark_problems.find(problem => problem.problem_id === problem_id) : false
  }

  addMark(problem_id: number | undefined) {
    if (this.data && problem_id && this.problem) {
      this.problemService.markOn(problem_id, JSON.parse(this.data).client_id)
      this.mark_problems.push(this.problem)
      // re-render the mark.
      this.reRenderMark(JSON.parse(this.data).client_id)
    } else {
      this.router.navigate(['/login'])
    }
  }

  removeMark(problem_id: number | undefined) {
    if (this.data && problem_id) {
      this.problemService.removeOn(problem_id, JSON.parse(this.data).client_id)
      this.mark_problems = this.mark_problems.filter(problem => problem.problem_id !== problem_id);
      
      // re-render the mark.
      this.reRenderMark(JSON.parse(this.data).client_id)
    } else {
      this.router.navigate(['/login'])
    }
  }

  reRenderMark(client_id: number) {
    this.problemService.loadProblemByMark(client_id).then(data => {
      this.dataService.setMarkProblems(data)
    }).catch(() => {
      this.dataService.setMarkProblems([])
    })
  }

  renderIdeas = () => { return (this.ideas) ? this.ideas : []}  

  agreeBtn(ideaId: number) {
    this.updateAgreement(ideaId, true);
  }
  
  disagreeBtn(ideaId: number) {
    this.updateAgreement(ideaId, false);
  }
  
  updateAgreement(ideaId: number, agreed: boolean) {
    if (this.data) {
      const client_id = JSON.parse(this.data).client_id;
      const agreement: Agreement = {
        agreed: agreed,
      };
  
      this.agreementService.updateAgreed(ideaId, client_id, agreement).then(() => {
        // After updating the agreement, reload the counts of agree and disagree reactions
        this.reloadAgreeDisagreeCounts(ideaId);
      });
    } else {
      this.router.navigate(['/login'])
    }
  }
  
  reloadAgreeDisagreeCounts(idea_id: number) {
    this.agreementService.loadAgreeReactions(idea_id).then(data => {
      this.agreeMap[idea_id] = data.length
    })

    //disagree rendering logic.
    this.agreementService.loadDisagreeReactions(idea_id).then(data => {
      this.disagreeMap[idea_id] = data.length
    })
  }
}
