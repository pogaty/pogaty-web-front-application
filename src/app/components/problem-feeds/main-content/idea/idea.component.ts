import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { dtsIdea } from 'src/app/components/application/app.component';
import { Agreement } from 'src/app/models/agreement.model';
import { Idea } from 'src/app/models/idea.model';
import { Participant } from 'src/app/models/participant.model';
import { Problem } from 'src/app/models/problem.model';
import { Trend } from 'src/app/models/trend.model';
import { AgreementService } from 'src/app/services/agreement.service';
import { DataService } from 'src/app/services/data.service';
import { ProblemService } from 'src/app/services/problem.service';
import { TrendService } from 'src/app/services/trend.service';

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
    private trendService: TrendService,
    private problemService: ProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mark_problems = this.dataService.getMarkProblems()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ideas) {
      this.ideas.forEach(idea => {
        const idea_id = idea.idea_id

        if (idea_id) {
          //agree rendering logic.
          this.agreementService.loadAgreeReactions(idea_id).then(data => {
            this.agreeMap[idea_id] = data.length
          })

          //disagree rendering logic.
          this.agreementService.loadDisagreeReactions(idea_id).then(data => {
            this.disagreeMap[idea_id] = data.length
          })
        }
        
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

  ideaOffer(problem_id: number) {
    if (this.data) {
      const data:dtsIdea = {
        bool: true, 
        id: problem_id
      }
  
      this.dataService.setIdeaOpen(data)
    } else {
      this.router.navigate(['/login'])
    }
    
  }
  
  updateAgreement(ideaId: number, agreed: boolean) {
    if (this.data) {
      const client_id = JSON.parse(this.data).client_id;
      const agreement: Agreement = {
        agreed: agreed,
      }
  
      this.agreementService.updateAgreed(ideaId, client_id, agreement).then(() => {
        // After updating the agreement, reload the counts of agree and disagree reactions
        this.reloadAgreeDisagreeCounts(ideaId);
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  updateTrend(problem_id: number, newTrend: boolean) {
    if (this.data) {
      const trend: Trend = {
        trend: newTrend,
      }

      const packet = {problem_id, trend}
      this.dataService.setShareTrend(packet)

      // this.trendService.updateTrend(problemId, client_id, trend).then(() => {
      //   this.reloadTrendRates(problemId)
      // })
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

  getParticipantCount(participant: Participant[]| undefined) {
    return (participant) ? participant.length : 0
  }
}
