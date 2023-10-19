import { NgModule } from "@angular/core";
import { ProblemFeedsComponent } from "../components/problem-feeds/problem-feeds.component";
import { ToolsComponent } from "../components/problem-feeds/tools/tools.component";

@NgModule ({
    declarations: [
        ProblemFeedsComponent,
        ToolsComponent
    ],
    exports: [
        ProblemFeedsComponent,
        ToolsComponent
    ]
})

export class ProblemFeedsModule {}