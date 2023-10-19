import { NgModule } from "@angular/core";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@NgModule({
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ]
})

export class SharedModule {}