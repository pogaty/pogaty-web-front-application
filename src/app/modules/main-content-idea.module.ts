import { NgModule } from "@angular/core";
import { MainContentIdeaComponent } from "../components/idea-page/main-content/main-content.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule ({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MainContentIdeaComponent
    ],
    exports: [
        MainContentIdeaComponent
    ]
})

export class McIdeaModule {}