import { NgModule } from "@angular/core";
import { MainContentComponent } from "../components/problem-feeds/main-content/main-content.component";

@NgModule({
    declarations: [
        MainContentComponent
    ],
    exports: [
        MainContentComponent
    ]
})

export class MainContentModule {}