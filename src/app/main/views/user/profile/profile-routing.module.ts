import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard, LeavePageGuard } from "src/app/shared/guards";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeavePageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
