import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LoginCollabrationComponent } from '../components/login-collabration/login-collabration.component';
@NgModule ({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
    ],
    declarations: [
        LoginCollabrationComponent
    ],
    exports: [
        LoginCollabrationComponent
    ]
})

export class LoginCollabrationComponentModule {}