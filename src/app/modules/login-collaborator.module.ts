import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LoginCollaboratorComponent } from '../components/login-collaborator/login-collaborator.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../components/login-collaborator/register-dialog/register-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule ({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule
    ],
    declarations: [
        LoginCollaboratorComponent,
        RegisterDialogComponent

    ],
    exports: [
        LoginCollaboratorComponent,
        RegisterDialogComponent
    ]
})

export class LoginCollaboratorModule {}