import { NgModule } from "@angular/core";
import { ProblemFeedsComponent } from "../components/problem-feeds/problem-feeds.component";
import { ToolsComponent } from "../components/problem-feeds/tools/tools.component";
import { MainContentModule } from "./main-content.module";
import { SideContentModule } from "./side-content.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule ({
    declarations: [
        ProblemFeedsComponent,
        ToolsComponent
    ],
    imports: [
        MainContentModule,
        SideContentModule,
        CommonModule,
        FormsModule,
        MatTooltipModule,
    ],
    exports: [
        ProblemFeedsComponent,
    ]
})

export class ProblemFeedsModule {}