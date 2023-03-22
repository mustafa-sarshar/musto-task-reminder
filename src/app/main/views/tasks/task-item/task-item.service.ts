import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  DataFlowService,
  DatabaseService,
  LogService,
} from "src/app/shared/services";
import { Log, Notification, Task } from "src/app/shared/models";

@Injectable()
export class TaskItemService implements OnInit, OnDestroy {
  private isDataFetching: boolean = false;
  private isDataFetchingSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService,
    private logService: LogService
  ) {}

  public ngOnInit(): void {
    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe(
        (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        }
      );
  }

  public ngOnDestroy(): void {
    this.isDataFetchingSubscription.unsubscribe();
  }

  public handleDeleteTask(
    userId: string,
    taskId: string,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);

    this.databaseService.deleteUserTask(userId, taskId).subscribe({
      next: (response: any) => {
        this.logService.logToConsole(
          new Log("The task deleted from database successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("DELETE_TASK", "SUCCESS")
        );

        this.dataFlowService.deleteUserTask(taskId);
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
      error: (error) => {
        this.logService.logToConsole(
          new Log("The task couldn't get deleted!", "ERROR")
        );
        this.logService.showNotification(
          new Notification("DELETE_TASK", "ERROR")
        );

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }

  public handleToggleDone(userId: string, task: Task) {
    this.appMonitoringService.setIsDataFetchingStatus(true);

    this.databaseService.updateUserTask(userId, task).subscribe({
      next: (response: any) => {
        this.logService.logToConsole(
          new Log("The task in database updated successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("UPDATE_TASK", "SUCCESS")
        );

        this.dataFlowService.updateUserTask(task);
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
      error: (error) => {
        this.logService.logToConsole(
          new Log("The task couldn't get updated!", "ERROR")
        );
        this.logService.showNotification(
          new Notification("UPDATE_TASK", "ERROR")
        );

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }
}
