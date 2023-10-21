import { NgModule } from "@angular/core";
import { SideContentComponent } from "../components/problem-feeds/side-content/side-content.component";
import { ProfileComponent } from "../components/problem-feeds/side-content/profile/profile.component";

@NgModule ({
    declarations: [
        SideContentComponent,
        ProfileComponent
    ],
    exports: [
        SideContentComponent,
        ProfileComponent
    ]
})

export class SideContentModule {}