import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "welcome",
    loadChildren: () =>
      import("./main/views/welcome-page/welcome-page.module").then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: "tasks",
    loadChildren: () =>
      import("./main/views/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./main/views/user/profile/profile.module").then(
        (m) => m.ProfileModule
      ),
  },
  { path: "**", redirectTo: "/welcome", pathMatch: "prefix" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
