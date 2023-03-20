import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { TasksListService } from "./tasks-list.service";
import { Task } from "src/app/shared/models";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
  providers: [TasksListService],
})
export class TasksListComponent implements OnInit, OnDestroy {
  @Input() userId: string | null = null;
  @Input() tasks: Task[] | null = null;
  public formGroupEl: FormGroup;

  constructor(private tasksListService: TasksListService) {}

  public ngOnInit(): void {
    this.formGroupEl = this.tasksListService.initForm(this.tasks);
  }

  public ngOnDestroy(): void {}

  public onClickClearSearchBox(): void {
    this.formGroupEl.reset({ title: "" });
  }
}
