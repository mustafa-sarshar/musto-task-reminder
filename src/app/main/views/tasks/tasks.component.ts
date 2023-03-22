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
  Notification,
  User,
  SortBy,
  SortByOptions,
  SortByType,
  TasksVisibilityFilterType,
  LanguageCode,
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
  public tasksVisibilityFilter: TasksVisibilityFilterType = "ALL";
  private userDataSubscription: Subscription = new Subscription();
  private appLanguageSubscription: Subscription = new Subscription();
  private isDataFetchingSubscription: Subscription = new Subscription();

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
        if (userData.tasks) {
          this.userData.tasks = [...userData.tasks];
        }
        this.logService.logToConsole(
          new Log("User Data loaded @Tasks", "INFO")
        );
        this.logService.logToConsole(new Log(userData));
        this.logService.logToConsole(new Log("Tasks Loaded", "INFO"));
        this.logService.logToConsole(new Log(userData.tasks));
      }
    );

    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    this.appLanguageSubscription.unsubscribe();
    this.isDataFetchingSubscription.unsubscribe();
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
        new ConfirmationDialogBox(
          "Please wait!",
          "If you leave the page now, you will discard the changes!",
          "OK/CANCEL"
        );
      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

  public onClickAddTask(): void {
    this.dialog.open(
      TaskAddEditComponent,
      TASK_ADD_FORM_STYLE
    ).componentInstance.userId = this.userData.uid;
  }

  public onClickDeleteAllTasks(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox(
        "Be careful!",
        "Do you really want to delete all your tasks?",
        "YES/NO"
      );
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.tasksService.handleDeleteAllTasks(this.userData.uid);
      }
    });
  }

  public onClickSortBy(
    sortByOption: SortByOptions,
    sortByType?: SortByType
  ): void {
    this.sortBy = new SortBy(sortByOption, sortByType);
    this.logService.logToConsole(
      new Log(`Sorted by ${sortByOption} (${sortByType})`)
    );
    const sortingOption =
      sortByOption === "TITLE"
        ? "title"
        : sortByOption === "DEADLINE"
        ? "date of deadline"
        : sortByOption === "DONE_AT_DATE"
        ? "date of completion"
        : "";
    if (sortingOption !== "") {
      // this.logService.showNotification(
      //   new Notification(
      //     `Sorted by ${sortingOption} (${sortByType.toLowerCase()})`,
      //     "WARN"
      //   )
      // );
    } else {
      // this.logService.showNotification(
      //   new Notification(`Tasks are not sorted`, "WARN")
      // );
    }
  }

  public onClickChangeTasksVisibilityFilter(
    visibilityFilterType: TasksVisibilityFilterType
  ): void {
    this.tasksVisibilityFilter = visibilityFilterType;
    // this.logService.showNotification(
    //   new Notification(
    //     `Visibility filtered changed! (${this.tasksVisibilityFilter.toLowerCase()} tasks)`,
    //     "WARN"
    //   )
    // );
  }
}
