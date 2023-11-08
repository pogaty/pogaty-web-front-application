import { NgModule } from "@angular/core";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTooltipModule,
    ],
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