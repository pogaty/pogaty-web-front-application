import { NgModule } from "@angular/core";
import { IdeaDashboardComponent } from "../components/idea-dashboard/idea-dashboard.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        IdeaDashboardComponent
    ],
    exports: [
      IdeaDashboardComponent
    ],
  })
  export class IdeaDashboardModule {}