import { Component, OnDestroy, OnInit } from "@angular/core";
import { UrlTree } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";

import { TaskAddEditComponent } from "./task-add-edit/task-add-edit.component";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import { AppMonitoringService, LogService } from "src/app/shared/services";
import { DataFlowService } from "src/app/shared/services/data-flow/data-flow.service";
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
} from "src/app/shared/models";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit, OnDestroy, onCanDeactivate {
  public isDataFetching: boolean = false;
  public userData: User | null = null;
  public sortBy: SortBy = new SortBy("TITLE", "ASC");
  private dataFlowServiceSubscription: Subscription = new Subscription();
  private databaseServiceSubscription: Subscription = new Subscription();
  private appMonitoringServiceSubscription: Subscription = new Subscription();

  constructor(
    private dataFlowService: DataFlowService,
    private logService: LogService,
    private appMonitoringService: AppMonitoringService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.dataFlowServiceSubscription = this.dataFlowService.userData.subscribe(
      (userData: User | null) => {
        this.userData = userData;
        this.logService.logToConsole(
          new Log("User Data loaded @Tasks", "INFO")
        );
        this.logService.logToConsole(new Log(userData));
        this.logService.logToConsole(new Log("Tasks Loaded", "INFO"));
        this.logService.logToConsole(new Log(userData.tasks));
      }
    );

    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.dataFlowServiceSubscription.unsubscribe();
    this.databaseServiceSubscription.unsubscribe();
    this.appMonitoringServiceSubscription.unsubscribe();
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
          "If you leave the page now, you will discard the changes!"
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

  public onClickSortBy(
    sortByOption: SortByOptions,
    sortByType?: SortByType
  ): void {
    this.sortBy = new SortBy(sortByOption, sortByType);
    this.logService.logToConsole(
      new Log(`Sort by ${sortByOption} (${sortByType})`)
    );
    this.logService.showNotification(
      new Notification(`Sort by ${sortByOption} (${sortByType})`, "WARN")
    );
  }
}
