import { NgModule } from "@angular/core";
import { SideContentIdeaComponent } from "../components/idea-page/side-content/side-content.component";
import { CommonModule } from "@angular/common";

@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        SideContentIdeaComponent
    ],
    exports: [
        SideContentIdeaComponent
    ]
})

export class ScIdeaModule {}