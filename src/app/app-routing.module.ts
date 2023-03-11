import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomePageComponent } from "./main/views/welcome-page/welcome-page.component";

const routes: Routes = [
  { path: "welcome", component: WelcomePageComponent },
  { path: "**", redirectTo: "/welcome", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
