import { U } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';

import { Client } from 'src/app/models/client.model';
import { Idea } from 'src/app/models/idea.model';
import { ClientService } from 'src/app/services/client.service.';
import { DataService } from 'src/app/services/data.service';
import { IdeaService } from 'src/app/services/idea.service';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.css'],
})
export class ExhibitionComponent implements OnInit {
  data = localStorage.getItem('userInfo');

  contentProblem: string = '';
  descriptionProblem: string = '';
  myPackage: any;
  category: string = 'global';
  errorlog = '';
  problem_id = 0;
  idea_id = 0;

  clientSubscription: Subscription | undefined;
  manageSubscription: Subscription | undefined;
  client: Client | undefined;

  ideas: Idea[] = [];
  clients: Client[] = [];
  filtered_clients: Client[] = [];
  participate_clients: Client[] = [];

  isProblemOpen = false;
  isIdeaOpen = false;
  isProfileOpen = false;
  isEditor = false;
  isPrivate = false;
  isManagement = false;

  userData: Client | undefined;

  constructor(
    private dataService: DataService,
    private clientService: ClientService,
    private participantService: ParticipantService,
    private ideaService: IdeaService
  ) {
    this.userData = undefined;
  }

  ngOnInit(): void {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const username = userInfo.username;

      this.clientService.loadUsers(username).then((data) => {
        console.log('loadUser work');
        this.userData = data;
        console.log(this.userData?.username); // it ok
      });
      this.renderIdea();
    }
  }

  renderIdea() {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const username = userInfo.username;
      this.participantService
        .getIdeasByClient(username)
        .then((data) => {
          this.ideas = data;
          console.log(this.ideas);
        })
        .catch(() => {
          this.ideas = [];
        });
    }
  }

  sliceKey(key: string) {
    return key ? key.slice(0, 200) : key;
  }
}
