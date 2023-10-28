import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Agreement } from 'src/app/models/agreement.model';
import { Idea } from 'src/app/models/idea.model';
import { AgreementService } from 'src/app/services/agreement.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnChanges {
  @Input() ideas: Idea[] | undefined
  agreeMap: { [key: number]: number } = {};
  disagreeMap : { [key: number]: number } = {};

  constructor(
    private agreementService: AgreementService,
    private router: Router
  ) {}

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

  renderIdeas = () => { return (this.ideas) ? this.ideas : []}  

  agreeBtn(idea_id: number) {
    const agreement = {agreed: true}
    this.agreedUpdator(idea_id, agreement)
  }

  disagreeBtn(idea_id: number) {
    const agreement = {agreed: false}
    this.agreedUpdator(idea_id, agreement)
  }

  agreedUpdator(idea_id: number, agreement: Agreement) {
    const data = localStorage.getItem('userInfo')

    if (!data) {
      this.router.navigate(['/login'])
    } else {
      const user_id = JSON.parse(data).client_id
      this.agreementService.updateAgreed(idea_id, user_id, agreement);
    }
  }

}
