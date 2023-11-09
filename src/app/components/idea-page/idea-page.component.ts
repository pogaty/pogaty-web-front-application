import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Idea } from 'src/app/models/idea.model';
import { Participant } from 'src/app/models/participant.model';
import { DataService } from 'src/app/services/data.service';
import { IdeaService } from 'src/app/services/idea.service';
import { ParticipantService } from 'src/app/services/participant.service';
import Swal from 'sweetalert2';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const ideaId = Number(this.route.snapshot.paramMap.get('ideaId'));
    if (ideaId) this.renderIdea(ideaId)

    if(this.data)
    this.participantService.getParticipantClient(ideaId, JSON.parse(this.data).client_id).then(data => {
      (data.role == 'creator') ? this.isCreator = true : this.isCreator = false
    })
    this.ideaData.emit(this.idea)

    this.onTrack = this.dataService.getOnTrack()
    .pipe(filter(data => !!data)).subscribe(() => {
      this.renderIdea(ideaId)
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation is complete
        window.scrollTo(0, 0);
      }
    });
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

  async serviceProject() {
    try {
      const check = await this.checkUserParticipate()
  
      if (check) {
        this.dataService.setProjectOpen(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          footer: '<a href="">Why do I have this issue?</a>',
          html: `
            <div>This idea is private. You must be a participant to use the function of it.</div>
          `,
        })
      }
    } catch (error) {
      // Handle any errors that may occur during the checkUserParticipate() function.
      console.error('Error:', error)
    }
  }

  async serviceBusiness() {
    try {
      const check = await this.checkUserParticipate()
  
      if (check) {
        this.dataService.setBusinessOpen(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          footer: '<a href="">Why do I have this issue?</a>',
          html: `
            <div>This idea is private. You must be a participant to use the function of it.</div>
          `,
        })
      }
    } catch (error) {
      // Handle any errors that may occur during the checkUserParticipate() function.
      console.error('Error:', error)
    }
  }

  async checkUserParticipate(): Promise<boolean> {
    const user = localStorage.getItem('userInfo')
    if (this.idea && user) {
      try {
        await this.participantService.getParticipantClient(this.idea.idea_id, JSON.parse(user).client_id);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

}
