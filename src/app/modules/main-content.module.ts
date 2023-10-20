import { NgModule } from "@angular/core";
import { MainContentComponent } from "../components/problem-feeds/main-content/main-content.component";
import { PostComponent } from "../components/problem-feeds/main-content/post/post.component";
import { FeedsComponent } from "../components/problem-feeds/main-content/feeds/feeds.component";

@NgModule({
    declarations: [
        MainContentComponent,
        PostComponent,
        FeedsComponent
    ],
    exports: [
        MainContentComponent,
        PostComponent,
        FeedsComponent
    ]
})

export class MainContentModule {}