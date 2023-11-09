import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idea } from 'src/app/models/idea.model';
import { ParticipantService } from 'src/app/services/participant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idea-dashboard',
  templateUrl: './idea-dashboard.component.html',
  styleUrls: ['./idea-dashboard.component.css']
})
export class IdeaDashboardComponent implements OnInit {
  ideas: Idea[] = []

  constructor(
    private participantService: ParticipantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const data = localStorage.getItem("userInfo")
    if (data)
    this.participantService.getIdeasByClient(JSON.parse(data).username)
    .then(idea => {
      this.ideas = idea
      console.log (idea)
    })
  }

  sliceKey(key: string) {
    return (key) ? key.slice(0,150) : key
  }

  ideaPage(idea: Idea) {
    const data = localStorage.getItem("userInfo")
    if (idea.publicState == false) {
      if (data) {
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
      window.scrollTo(0, 0);
    }
}
}
