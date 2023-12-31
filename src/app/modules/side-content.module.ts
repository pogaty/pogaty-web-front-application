import { NgModule } from "@angular/core";
import { SideContentComponent } from "../components/problem-feeds/side-content/side-content.component";
import { ProfileComponent } from "../components/problem-feeds/side-content/profile/profile.component";
import { AnnounceComponent } from "../components/problem-feeds/side-content/announce/announce.component";
import { RecommendComponent } from "../components/problem-feeds/side-content/recommend/recommend.component";

@NgModule ({
    declarations: [
        SideContentComponent,
        ProfileComponent,
        AnnounceComponent,
        RecommendComponent
    ],
    exports: [
        SideContentComponent,
        ProfileComponent,
        AnnounceComponent,
        RecommendComponent
    ]
})

export class SideContentModule {}