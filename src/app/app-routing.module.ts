import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard, WelcomePageGuard } from "./shared/guards";

import { WelcomePageComponent } from "./main/views/welcome-page/welcome-page.component";
import { TasksComponent } from "./main/views/tasks/tasks.component";
import { UserProfileComponent } from "./main/views/user/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomePageComponent,
    canActivate: [WelcomePageGuard],
  },
  { path: "tasks", component: TasksComponent, canActivate: [AuthGuard] },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/welcome", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
