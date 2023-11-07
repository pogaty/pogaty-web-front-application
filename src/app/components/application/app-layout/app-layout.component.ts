import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Service } from 'src/app/models/service.model';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild("wrapper") divWrapper!: ElementRef;
  logicExecuted = false;
  isProjectOpen = false
  isBusinessOpen = false
  pressed = false
  spStep = 1
  startX = 0
  
  pCategory: string = 'any'
  bCategory: string = 'any'

  services: Service[] = []

  pAns1 = ['Yes!', 'No!']
  
  projectSubscription: Subscription | undefined
  businessSubscription: Subscription | undefined
  
  constructor(
    private dataService: DataService,
    private serviceService: ServiceService,
    private renderer: Renderer2, 
    private el: ElementRef,
  ) { }

  ngAfterViewChecked(): void {
    if (this.spStep == 2 && !this.logicExecuted) {
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
      this.logicExecuted = true;
    }
  }

  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe()
    }

    if (this.businessSubscription) {
      this.businessSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.spStep = 1
    this.projectSubscription = this.dataService.getProjectOpen()
    .pipe(filter(data => !!data)).subscribe(data => {
      this.isProjectOpen = data
    })

    this.businessSubscription = this.dataService.getBusinessOpen()
    .pipe(filter(data => !!data)).subscribe(data => {
      this.isBusinessOpen = data
    })
  }

  close () {
    if (this.spStep != 1) {
      this.spStep --
    } else {
      this.spStep = 1
      this.isProjectOpen = false
      this.isBusinessOpen = false
      this.dataService.setProjectOpen(false)
      this.dataService.setBusinessOpen(false)
    }

    this.pCategory = 'any'
    this.bCategory = 'any'
    this.logicExecuted = false
  }

  setProjectCategory(category: string) {
    this.pCategory = category
  }

  setBusinessCategory(category: string) {
    this.bCategory = category
  }

  choose() {
    if (this.spStep != 3) {
      this.spStep ++ 

      
      if (this.spStep == 3) {
        if (this.isProjectOpen) {
          if (this.pCategory == 'any') {
            this.serviceService.loadServicesByType('project')
            .then((data) => {
              this.services = data
              console.log (this.services)
            }).catch(() => this.services = [])
          } else {
            this.serviceService.loadServicesByTypeAndCategory('project', this.pCategory)
            .then((data) => {
              this.services = data
              console.log (this.services)
            }).catch(() => this.services = [])
          }
        } 

        else if (this.isBusinessOpen) {
          if (this.bCategory == 'any') {
            this.serviceService.loadServicesByType('business')
            .then((data) => {
              this.services = data
              console.log (this.services)
            }).catch(() => this.services = [])
          } else {
            this.serviceService.loadServicesByTypeAndCategory('business', this.bCategory)
            .then((data) => {
              this.services = data
              console.log (this.services)
            }).catch(() => this.services = [])
          }
        }
      }

      return (this.spStep == 2 && this.pAns1[0] == 'No!') ? this.end() : null
    } else {
      return this.end()
    }
  }

  end() {
    this.pAns1 = ['Yes!', 'No!']
    this.spStep = 1
    this.isProjectOpen = false
    this.isBusinessOpen = false
    this.dataService.setProjectOpen(false)
    this.dataService.setBusinessOpen(false)
  }

  changeAns(pAns: string) {
    (pAns === "No!") ? this.pAns1 = [pAns, "Yes!"] : this.pAns1 = [pAns, "No!"]
  }

}
