import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WelcomePageGuard } from "src/app/shared/guards";
import { WelcomePageComponent } from "./welcome-page.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomePageComponent,
    canActivate: [WelcomePageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
