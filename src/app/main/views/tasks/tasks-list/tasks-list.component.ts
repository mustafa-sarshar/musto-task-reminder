import {
  Component,
  Input,
  OnChanges,
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
export class TasksListComponent implements OnInit, OnChanges {
  @Input() userId: string | null = null;
  @Input() tasks: Task[] | null = null;
  public formGroupEl: FormGroup;
  public paginationPageEvent: PageEvent;
  public paginationSettings = {
    length: 0,
    pageIndex: 0,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
    hidePageSize: false,
    showFirstLastButtons: false,
    showPageSizeOptions: true,
    disabled: false,
    disabledNext: false,
    disabledPrev: false,
  };

  constructor(
    private tasksListService: TasksListService,
    private logService: LogService
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.tasksListService.initForm(this.tasks);

    this.paginationSettings.length = this.tasks.length;
    this.paginationSettings.pageIndex = 0;
    this.handleChangePageEvent(this.paginationSettings);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).indexOf("tasks") > -1) {
      this.paginationSettings.length = this.tasks.length;
      this.paginationSettings.pageIndex = 0;
      this.handleChangePageEvent(this.paginationSettings);
    }
  }

  public onClickClearSearchBox(): void {
    this.formGroupEl.reset({ title: "" });
  }

  public onClickChangePageSize(pageSize: number): void {
    this.paginationSettings.pageSize = pageSize;
    this.paginationSettings.pageIndex = 0;
    this.tasksListService.updatePaginatorButtons(this.paginationSettings);
  }

  public handleChangePageEvent(pageEvent: PageEvent) {
    this.paginationPageEvent = pageEvent;
    this.paginationSettings.length = pageEvent.length;
    this.paginationSettings.pageSize = pageEvent.pageSize;
    this.paginationSettings.pageIndex = pageEvent.pageIndex;
    this.tasksListService.updatePaginatorButtons(this.paginationSettings);

    // this.logService.logToConsole(new Log("Page Event Changed!", "INFO"));
    // this.logService.logToConsole(new Log(pageEvent));
  }
}
