import { NgModule } from "@angular/core";
import { SideContentComponent } from "../components/problem-feeds/side-content/side-content.component";

@NgModule ({
    declarations: [
        SideContentComponent
    ],
    exports: [
        SideContentComponent
    ]
})

export class SideContentModule {}