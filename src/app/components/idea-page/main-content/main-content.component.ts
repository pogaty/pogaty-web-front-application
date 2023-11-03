import { Component, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Idea } from 'src/app/models/idea.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentIdeaComponent implements OnInit  {
  @Input() idea: Idea | undefined
  isEditorMode: boolean = false
  pressed = false
  startX = 0

  ideaData = {
    key: '',
    board: ''
  }

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private router: Router,
    private dataService: DataService
  ) {
    if(this.idea && this.idea.key) {
      this.ideaData.key = this.idea.key
    }
   }

  ngOnInit(): void {
    const wrapper = this.el.nativeElement.querySelector('.wrapper')

    this.renderer.listen(wrapper, 'mousedown', (e) => {
      this.pressed = true
      this.startX = e.clientX
      wrapper.style.cursor = 'grabbing' 

      console.log(this.startX)
    })

    this.renderer.listen(window, 'mouseup', (e) => {
      this.pressed = false
      wrapper.style.cursor = 'grab' 
    })

    this.renderer.listen(wrapper, 'mouseleave', (e) => {
      this.pressed = false
    })

    this.renderer.listen(wrapper, 'mousemove', (e) => {
      if(!this.pressed) {
        return
      }

      wrapper.scrollLeft += this.startX - e.clientX
    })

    this.dataService.getEditorMode().subscribe(data => {
      this.isEditorMode = data
    })
  }
  
  problemPage() {
    this.router.navigate(['/problem'])
  }

  headerEnter(content: string) {
    this.dataService.getRecieveIdea()[0] = content
    console.log (content)
  }

  keyEnter(content: string) {
    this.dataService.getRecieveIdea()[1] = content
    console.log (content)
  }

  boardEnter(content: string) {
    this.dataService.getRecieveIdea()[2] = content
    console.log (content)
  }
}
