import { Component, Input } from '@angular/core';
import { Problem } from 'src/app/models/problem.model';
import { Idea } from 'src/app/models/idea.model';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent {
  @Input() ideas: Idea[] | undefined

  renderIdeas = () => { return (this.ideas) ? this.ideas : []}  
}
