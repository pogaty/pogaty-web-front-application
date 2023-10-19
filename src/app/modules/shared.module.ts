import { NgModule } from "@angular/core";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent
    ]
})

export class SharedModule {}