import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentIdeaComponent implements OnInit  {
  pressed = false
  startX = 0

  constructor(private renderer: Renderer2, private el: ElementRef) { }

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
  }
  
}
