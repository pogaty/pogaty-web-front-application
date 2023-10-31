import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Problem } from 'src/app/models/problem.model';
import { DataService } from 'src/app/services/data.service';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Pogaty';
  contentProblem: string = ''
  descriptionProblem: string = ''
  myPackage: any
  category: string = 'global'
  errorlog = ''

  isProblemOpen = false
  isEditor = false
  
  constructor (
    private dataService: DataService,
    private problemService: ProblemService
  ) { }

  ngOnInit(): void {
    this.isEditor = false
    this.dataService.getProblemOpen().subscribe(data => {
      this.isProblemOpen = data
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
      this.isProblemOpen = false;
      this.isEditor = false;
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
        }
        
        this.isProblemOpen = false
        this.category = 'global'
        this.errorlog = ''
        this.dataService.setOnTrack(1)
      }
    }
  }
}
