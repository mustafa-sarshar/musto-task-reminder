import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";

import { TasksListService } from "./tasks-list.service";
import { LogService } from "src/app/shared/services";
import { Log, Task } from "src/app/shared/models";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
  providers: [TasksListService],
})
export class TasksListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() userId: string | null = null;
  @Input() tasks: Task[] | null = null;
  public formGroupEl: FormGroup;
  public paginationPageEvent: PageEvent;
  public pagination = {
    length: 0,
    pageIndex: 0,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
    hidePageSize: false,
    showFirstLastButtons: false,
    showPageSizeOptions: true,
    disabled: false,
  };

  constructor(
    private tasksListService: TasksListService,
    private logService: LogService
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.tasksListService.initForm(this.tasks);
    this.pagination.length = this.tasks.length;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).indexOf("tasks") > -1) {
      this.pagination.length = this.tasks.length;
      this.pagination.pageIndex = 0;
    }
  }

  public ngOnDestroy(): void {}

  public onClickClearSearchBox(): void {
    this.formGroupEl.reset({ title: "" });
  }

  public handlePaginationEvent(pageEvent: PageEvent) {
    this.paginationPageEvent = pageEvent;
    this.pagination.length = pageEvent.length;
    this.pagination.pageSize = pageEvent.pageSize;
    this.pagination.pageIndex = pageEvent.pageIndex;

    this.logService.logToConsole(new Log("Pagination Changed!", "INFO"));
    this.logService.logToConsole(new Log(this.pagination));
  }
}
