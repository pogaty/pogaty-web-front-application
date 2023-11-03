import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {
  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>) { }

  onClose(): void {
    this.dialogRef.close();
  }

  submitRegistration(): void {
    // Handle your registration logic here
    // Access form values: this.registrationForm.value
    // Example: this.authService.register(this.registrationForm.value)
    this.dialogRef.close();
  }
}
