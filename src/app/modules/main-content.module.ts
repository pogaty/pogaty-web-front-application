import { NgModule } from "@angular/core";
import { MainContentComponent } from "../components/problem-feeds/main-content/main-content.component";
import { PostComponent } from "../components/problem-feeds/main-content/post/post.component";
import { FeedsComponent } from "../components/problem-feeds/main-content/feeds/feeds.component";
import { IdeaComponent } from "../components/problem-feeds/main-content/idea/idea.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MainContentComponent,
        PostComponent,
        FeedsComponent,
        IdeaComponent,
    ],
    exports: [
        MainContentComponent,
        PostComponent,
        FeedsComponent,
        IdeaComponent,
    ]
})

export class MainContentModule {}