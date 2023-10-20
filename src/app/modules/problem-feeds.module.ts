import { NgModule } from "@angular/core";
import { ProblemFeedsComponent } from "../components/problem-feeds/problem-feeds.component";
import { ToolsComponent } from "../components/problem-feeds/tools/tools.component";
import { MainContentModule } from "./main-content.module";
import { SideContentModule } from "./side-content.module";

@NgModule ({
    declarations: [
        ProblemFeedsComponent,
        ToolsComponent
    ],
    imports: [
        MainContentModule,
        SideContentModule
    ],
    exports: [
        ProblemFeedsComponent,
        ToolsComponent
    ]
})

export class ProblemFeedsModule {}