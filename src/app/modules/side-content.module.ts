import { NgModule } from "@angular/core";
import { SideContentComponent } from "../components/problem-feeds/side-content/side-content.component";
import { ProfileComponent } from "../components/problem-feeds/side-content/profile/profile.component";
import { AnnounceComponent } from "../components/problem-feeds/side-content/announce/announce.component";

@NgModule ({
    declarations: [
        SideContentComponent,
        ProfileComponent,
        AnnounceComponent
    ],
    exports: [
        SideContentComponent,
        ProfileComponent,
        AnnounceComponent
    ]
})

export class SideContentModule {}