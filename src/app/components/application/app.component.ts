import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
  idea_id = 0

  clientSubscription: Subscription | undefined
  manageSubscription: Subscription | undefined
  client: Client | undefined

  ideas: Idea[] = []
  clients: Client[] = []
  filtered_clients: Client[] = []
  participate_clients: Client[] = []

  isProblemOpen = false
  isIdeaOpen = false
  isProfileOpen = false
  isEditor = false
  isPrivate = false
  isManagement = false
  
  constructor (
    private dataService: DataService,
    private problemService: ProblemService,
    private clientService: ClientService,
    private participantService: ParticipantService,
    private ideaService: IdeaService,
    private renderer: Renderer2, 
    private el: ElementRef,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe()
    }

    if (this.manageSubscription) {
      this.manageSubscription.unsubscribe()
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

    this.manageSubscription = this.dataService.getManagement()
    .pipe(filter(data => !!data)).subscribe(data => {
      this.isManagement = data.bool
      this.idea_id = data.id
      const client_id = localStorage.getItem("userInfo")

      if (client_id) {
        this.clientService.loadWithoutParticipantAndSelf(JSON.parse(client_id).client_id, data.id)
        .then(data => {
          this.clients = data
          this.filtered_clients = data
        }).catch(() => {
          this.clients = []
          this.filtered_clients = []
        })

        this.ideaService.getIdeaParticipator(data.id, JSON.parse(client_id).client_id).then(data => {
          this.participate_clients = data
        }).catch(() => {
          this.participate_clients = []
        })
      }
      
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
      }).catch(() => {
        this.ideas = []
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

  clientFilter(filter: string) {
    if (filter) {
      console.log(filter)
      this.clients = this.filtered_clients.filter((client) => {
        return client.username?.toLowerCase().includes(filter.toLowerCase())
      })
    }
  }

  addParticipant(client: Client) {
    if(client.client_id) {
      const index = this.clients.indexOf(client);
      if (index !== -1) {
        this.clients.splice(index, 1);
      }

      this.participate_clients.push(client)
      this.participantService.addParticipant(this.idea_id ,client.client_id)
    }
  }

  removeParticipant(client: Client) {
    if (client.client_id) {
      const index = this.participate_clients.indexOf(client);
      if (index !== -1) {
        this.participate_clients.splice(index, 1);
      }

      this.clients.push(client)
      this.participantService.removeParticipant(this.idea_id ,client.client_id)
    }
  }

  closePopup(event: Event): void {
    if (event.target === event.currentTarget) {
      this.isProblemOpen = false
      this.isIdeaOpen = false
      this.isProfileOpen = false
      this.isEditor = false
      this.isManagement = false
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
    return (key) ? key.slice(0,200) : key
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

  getImg () {
    const id = this.client?.client_id
    console.log (id)
    if (id) {
      return this.dataService.getClientById(id)
    }
    return 
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