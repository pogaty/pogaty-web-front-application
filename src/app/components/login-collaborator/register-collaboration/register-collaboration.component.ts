import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-collaboration',
  templateUrl: './register-collaboration.component.html',
  styleUrls: ['./register-collaboration.component.css']
})
export class RegisterCollaborationComponent {

  isOpen: boolean = false;
  @Output() closePopup = new EventEmitter();

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.closePopup.emit();
}
}
