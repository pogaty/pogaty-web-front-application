import { NgModule } from "@angular/core";
import { IdeaPageComponent } from "../components/idea-page/idea-page.component";
import { McIdeaModule } from "./main-content-idea.module";
import { ScIdeaModule } from "./side-content-idea.module";

@NgModule({
    declarations: [
        IdeaPageComponent
    ],
    imports: [
        McIdeaModule,
        ScIdeaModule
    ],
    exports: [
        IdeaPageComponent
    ],
  })
  export class IdeaPageModule {}