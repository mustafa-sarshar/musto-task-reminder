import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import {
  ApplyPaginationPipe,
  StringShortenerPipe,
  TasksFilterPipe,
  TasksSortPipe,
  TasksVisibilityFilterPipe,
} from "src/app/shared/pipes";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TasksMaterialModule } from "./tasks-material.module";

import { TasksComponent } from "./tasks.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TaskItemComponent } from "./task-item/task-item.component";
import { TaskAddEditComponent } from "./task-add-edit/task-add-edit.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";

const taskComponents = [
  TasksComponent,
  TasksListComponent,
  TaskItemComponent,
  TaskAddEditComponent,
  TaskDetailsComponent,
  TaskAddEditComponent,
];

@NgModule({
  declarations: [
    taskComponents,
    StringShortenerPipe,
    TasksFilterPipe,
    TasksSortPipe,
    TasksVisibilityFilterPipe,
    ApplyPaginationPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    TasksMaterialModule,
  ],
})
export class TasksModule {}
