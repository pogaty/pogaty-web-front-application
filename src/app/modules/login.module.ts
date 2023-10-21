import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "../components/login/login.component";

@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule {}