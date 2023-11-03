import { RouterModule, Routes } from "@angular/router";
import { ProblemFeedsComponent } from "../components/problem-feeds/problem-feeds.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "../components/login/login.component";
import { AppLayoutComponent } from "../components/application/app-layout/app-layout.component";
import { HomeComponent } from "../components/home/home.component";
import { ProfilePageComponent } from "../components/profile-page/profile-page.component";
import { IdeaPageComponent } from "../components/idea-page/idea-page.component";

const routes: Routes = [
    {
        path: 'home',
        component: AppLayoutComponent,
        children: [
            { path: '', component: HomeComponent }, // Default route for /home
        ]
    },
    { 
        path: 'problem', 
        component: AppLayoutComponent,
        children: [
            { path: '', component: ProblemFeedsComponent }
        ]
    },
    { 
        path: 'idea/:ideaId', 
        component: AppLayoutComponent,
        children: [
            { path: '', component: IdeaPageComponent }
        ]
    },
    { 
        path: 'profile', 
        component: AppLayoutComponent,
        children: [
            { path: '', component: ProfilePageComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirect empty path to /home
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  
export class AppRoutingModule {}