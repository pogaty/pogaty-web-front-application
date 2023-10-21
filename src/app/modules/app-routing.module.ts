import { RouterModule, Routes } from "@angular/router";
import { ProblemFeedsComponent } from "../components/problem-feeds/problem-feeds.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "../components/login/login.component";
import { AppLayoutComponent } from "../components/application/app-layout/app-layout.component";

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: 'problem', component: ProblemFeedsComponent },
        ]
    },
    { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  
export class AppRoutingModule {}