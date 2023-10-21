import { RouterModule, Routes } from "@angular/router";
import { ProblemFeedsComponent } from "../components/problem-feeds/problem-feeds.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: ProblemFeedsComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  
export class AppRoutingModule {}