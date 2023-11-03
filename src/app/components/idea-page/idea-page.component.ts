import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Idea } from 'src/app/models/idea.model';
import { Participant } from 'src/app/models/participant.model';
import { DataService } from 'src/app/services/data.service';
import { IdeaService } from 'src/app/services/idea.service';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-idea-page',
  templateUrl: './idea-page.component.html',
  styleUrls: ['./idea-page.component.css']
})
export class IdeaPageComponent implements OnInit, OnDestroy {
  data = localStorage.getItem('userInfo')
  isParticipant = false
  isCreator = false

  idea: Idea | undefined
  @Output() ideaData: EventEmitter<Idea | undefined> = new EventEmitter<Idea | undefined>()
  ideaSubscription: Subscription | undefined
  onTrack: Subscription | undefined

  constructor(
    private dataService: DataService,
    private ideaService: IdeaService,
    private participantService: ParticipantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const ideaId = Number(this.route.snapshot.paramMap.get('ideaId'));
    if (ideaId) this.renderIdea(ideaId)

    if(this.data)
    this.participantService.getParticipantClient(ideaId, JSON.parse(this.data).client_id).then(data => {
      (data.role == 'creator') ? this.isCreator = true : this.isCreator = false
    })

    console.log(this.idea)
    this.ideaData.emit(this.idea)

    this.onTrack = this.dataService.getOnTrack()
    .pipe(filter(data => !!data)).subscribe(() => {
      this.renderIdea(ideaId)
    })
  }

  renderIdea(ideaId: number) {
    if (ideaId) {
      this.ideaService.getIdeaById(ideaId).then((idea: Idea) => {
        if (idea) 
        this.idea = idea
      })
    }
  }

  ngOnDestroy(): void {
    if(this.onTrack) {
      this.onTrack.unsubscribe()
    }
  }

}
