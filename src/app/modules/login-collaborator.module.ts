import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LoginCollaboratorComponent } from '../components/login-collaborator/login-collaborator.component';
import { RegisterCollaborationComponent } from '../components/login-collaborator/register-collaboration/register-collaboration.component';


@NgModule ({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
    ],
    declarations: [
        LoginCollaboratorComponent,
        RegisterCollaborationComponent
    ],
    exports: [
        LoginCollaboratorComponent,
        RegisterCollaborationComponent
    ]
})

export class LoginCollaboratorModule {}