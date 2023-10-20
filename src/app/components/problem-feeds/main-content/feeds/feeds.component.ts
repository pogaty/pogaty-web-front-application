import { Component } from '@angular/core';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent {
  showIdeas = false

  toggleIdeas(): void {
    this.showIdeas = !this.showIdeas
    console.log(`[feeds] showIdeas = ${this.showIdeas}`)
  }
}
