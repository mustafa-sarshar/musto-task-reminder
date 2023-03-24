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
import { TranslateForChildModule } from "src/app/shared/modules";

import { TasksComponent } from "./tasks.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TaskItemComponent } from "./task-item/task-item.component";
import { TaskAddEditComponent } from "./task-add-edit/task-add-edit.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { TaskReminderComponent } from "./task-reminder/task-reminder.component";

const taskComponents = [
  TasksComponent,
  TasksListComponent,
  TaskItemComponent,
  TaskAddEditComponent,
  TaskDetailsComponent,
  TaskAddEditComponent,
  TaskReminderComponent,
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
    TranslateForChildModule,
  ],
})
export class TasksModule {}
