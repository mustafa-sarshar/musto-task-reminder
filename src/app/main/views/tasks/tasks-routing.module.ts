import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard, LeavePageGuard } from "src/app/shared/guards";
import { TasksComponent } from "./tasks.component";

const routes: Routes = [
  {
    path: "",
    component: TasksComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeavePageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
