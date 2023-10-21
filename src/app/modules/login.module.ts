import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        LoginModule
    ],
    exports: [
        LoginModule
    ]
})

export class LoginModule {}