import { Component, OnDestroy, OnInit } from "@angular/core";
import { UrlTree } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { TaskAddEditComponent } from "./task-add-edit/task-add-edit.component";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import {
  AppMonitoringService,
  LogService,
  DataFlowService,
} from "src/app/shared/services";
import { TasksService } from "./tasks.service";
import { onCanDeactivate } from "src/app/shared/guards";

import { CONFIRMATION_POPUP_STYLE, TASK_ADD_FORM_STYLE } from "src/configs";
import {
  ConfirmationDialogBox,
  Log,
  User,
  SortBy,
  SortByOptions,
  SortByType,
  TasksVisibilityFilterType,
  LanguageCode,
  TaskReminder,
} from "src/app/shared/models";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
  providers: [TasksService],
})
export class TasksComponent implements OnInit, OnDestroy, onCanDeactivate {
  public isDataFetching: boolean = false;
  public userData: User | null = null;
  public sortBy: SortBy = new SortBy("TITLE", "ASC");
  public taskReminders: TaskReminder[] = [];
  public tasksVisibilityFilter: TasksVisibilityFilterType = "ALL";
  private userDataSubscription?: Subscription;
  private taskRemindersSubscription?: Subscription;
  private appLanguageSubscription?: Subscription;
  private isDataFetchingSubscription?: Subscription;

  constructor(
    private dataFlowService: DataFlowService,
    private logService: LogService,
    private appMonitoringService: AppMonitoringService,
    private tasksService: TasksService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.dataFlowService.applyAppLanguage();

    this.appLanguageSubscription = this.dataFlowService.appLanguage.subscribe(
      (selectedLanguage: LanguageCode) => {
        this.translateService.use(selectedLanguage);
      }
    );

    this.userDataSubscription = this.dataFlowService.userData.subscribe(
      (userData: User | null) => {
        this.userData = userData;

        this.logService.logToConsole(
          new Log("User Data loaded @Tasks", "INFO")
        );
        this.logService.logToConsole(new Log(userData));

        if (userData && userData.tasks && this.userData) {
          this.userData.tasks = [...userData.tasks];

          this.logService.logToConsole(new Log("Tasks Loaded", "INFO"));
          this.logService.logToConsole(new Log(userData.tasks));
        }
      }
    );

    this.taskRemindersSubscription =
      this.dataFlowService.taskReminders.subscribe(
        (taskReminders: TaskReminder[] | null) => {
          if (taskReminders) {
            this.taskReminders = taskReminders.slice();
          }

          this.logService.logToConsole(
            new Log("Task reminders loaded @Tasks", "INFO")
          );
          this.logService.logToConsole(new Log(taskReminders));
        }
      );

    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
    this.taskRemindersSubscription?.unsubscribe();
    this.appLanguageSubscription?.unsubscribe();
    this.isDataFetchingSubscription?.unsubscribe();
  }

  public onCanDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.isDataFetching) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.confirmationDialogBox =
        new ConfirmationDialogBox("LEAVE_PAGE", "OK/CANCEL");
      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

  public onClickAddTask(): void {
    if (this.userData) {
      this.dialog.open(
        TaskAddEditComponent,
        TASK_ADD_FORM_STYLE
      ).componentInstance.userId = this.userData.uid;
    }
  }

  public onClickDeleteAllTasks(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox("DELETE_ALL_TASKS", "YES/NO");
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        if (this.userData) {
          this.tasksService.handleDeleteAllTasks(this.userData.uid);
        }
      }
    });
  }

  public onClickSortBy(
    sortByOption: SortByOptions,
    sortByType?: SortByType
  ): void {
    if (sortByType) {
      this.sortBy = new SortBy(sortByOption, sortByType);
    } else {
      this.sortBy = new SortBy(sortByOption);
    }

    this.logService.logToConsole(
      new Log(`Sorted by ${sortByOption} (${sortByType})`)
    );
  }

  public onClickChangeTasksVisibilityFilter(
    visibilityFilterType: TasksVisibilityFilterType
  ): void {
    this.tasksVisibilityFilter = visibilityFilterType;
  }
}
