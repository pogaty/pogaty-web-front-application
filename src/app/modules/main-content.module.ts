import { NgModule } from "@angular/core";
import { MainContentComponent } from "../components/problem-feeds/main-content/main-content.component";
import { PostComponent } from "../components/problem-feeds/main-content/post/post.component";

@NgModule({
    declarations: [
        MainContentComponent,
        PostComponent
    ],
    exports: [
        MainContentComponent,
        PostComponent
    ]
})

export class MainContentModule {}