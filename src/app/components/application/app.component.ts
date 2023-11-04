import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Idea } from 'src/app/models/idea.model';
import { ClientService } from 'src/app/services/client.service.';
import { DataService } from 'src/app/services/data.service';
import { IdeaService } from 'src/app/services/idea.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProblemService } from 'src/app/services/problem.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'Pogaty';

  contentProblem: string = ''
  descriptionProblem: string = ''
  myPackage: any
  category: string = 'global'
  errorlog = ''
  problem_id = 0

  clientSubscription: Subscription | undefined
  client: Client | undefined
  ideas: Idea[] = []

  isProblemOpen = false
  isIdeaOpen = false
  isProfileOpen = false
  isEditor = false
  isPrivate = false
  
  constructor (
    private dataService: DataService,
    private problemService: ProblemService,
    private clientService: ClientService,
    private participantService: ParticipantService,
    private ideaService: IdeaService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.isEditor = false
    this.dataService.getProblemOpen().subscribe(data => {
      this.isProblemOpen = data
    })

    this.dataService.getIdeaOpen().subscribe(data => {
      this.isIdeaOpen = data.bool
      this.problem_id = data.id
      console.log(data)
    })

    this.clientSubscription = this.dataService.getProfileOpen().subscribe(data => {
      this.isProfileOpen = data.bool
      this.clientService.loadUsers(data.username).then((data) => {
        this.client = data
        console.log(this.client)
      })

      this.participantService.getIdeasByClient(data.username).then((data) => {
        this.ideas = data
        console.log(this.ideas)
      })
    })

    this.dataService.getProblemContent().subscribe(data => {
      this.contentProblem = data
    })

    this.dataService.getUpdateProblem().pipe(filter(data => data)).subscribe(data => {
      this.isEditor = true
      this.myPackage = data
      this.contentProblem = data.topic || null
      this.descriptionProblem = data.description
      console.log(this.myPackage)
    })
  }

  closePopup(event: Event): void {
    if (event.target === event.currentTarget) {
      this.isProblemOpen = false
      this.isIdeaOpen = false
      this.isProfileOpen = false
      this.isEditor = false
      this.category = 'global'
      this.errorlog = ''  
    }
  }

  setCategory(category: string) {
    this.category = category
  }

  createPost(topic: string, description: string) {
    if (!topic || !description) {
      this.errorlog = "The problem must contain the fields request." 
    } else {
      const data = localStorage.getItem('userInfo')
      if (data) {
        const client_id = JSON.parse(data).client_id
        const problem = {
          topic: topic,
          description: description,
          category: this.category
        }
  
        if (!this.isEditor) {
          this.problemService.createNewPost(client_id, problem)
        } else {
          this.problemService.updateNewPost(this.myPackage.id, problem)
          this.isEditor = false
          this.descriptionProblem = ''
        }
        
        this.resetData()
      }
    }
  }

  createIdea(ideaHeader: string, key: string, privacy: boolean) {
    if (!ideaHeader || !key) {
      this.errorlog = "The idea must contain the fields request." 
    } else {
      const data = localStorage.getItem('userInfo')
      if (data) {
        const client_id = JSON.parse(data).client_id
        console.log(client_id)
        const idea = {
          ideaHeader: ideaHeader,
          key: key,
          publicState: privacy
        }

        this.ideaService.createIdea(this.problem_id, client_id, idea)
        this.resetData()
      }
    }
  }

  resetData() {
    this.isProblemOpen = false
    this.isIdeaOpen = false
    this.category = 'global'
    this.errorlog = ''
    this.dataService.setOnTrack(1)
  }

  sliceKey(key: string) {
    if (key) key.slice(0,50)
    return key
  }

  ideaPage(idea: Idea) {
    this.isProfileOpen = false
    if (idea.publicState == false) {
      const data = localStorage.getItem("userInfo")
      if (data) {
        console.log (data)
        this.participantService.getParticipantClient(idea.idea_id, JSON.parse(data).client_id)
        .then(() => { this.router.navigate(['/idea', idea.idea_id]) })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            footer: '<a href="">Why do I have this issue?</a>',
            html:
            `
              <div>This idea is an private you must be a participant to see the details and description of it.</div>
            `
          })
        })
      } else {
        this.router.navigate(['/login'])
      }
    } else {
      this.router.navigate(['/idea', idea.idea_id])
    }
  }
}

export interface dtsIdea {
  bool: boolean,
  id: number
}

export interface dtsClient {
  bool: boolean,
  username: string
}