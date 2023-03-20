import { Injectable, OnInit } from "@angular/core";
import { Log, Notification } from "src/app/shared/models";
import {
  AppMonitoringService,
  DataFlowService,
  DatabaseService,
  LogService,
} from "src/app/shared/services";

@Injectable()
export class TasksService implements OnInit {
  constructor(
    private appMonitoringService: AppMonitoringService,
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService,
    private logService: LogService
  ) {}

  public ngOnInit(): void {}

  public handleDeleteAllTasks(
    userId: string,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);

    this.databaseService.deleteUserTasksAll(userId).subscribe({
      next: (response: any) => {
        this.logService.logToConsole(
          new Log("All Tasks deleted from database successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("All Tasks deleted successfully!", "SUCCESS")
        );

        this.dataFlowService.deleteUserTasksAll();
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
      error: (error) => {
        this.logService.logToConsole(
          new Log("The task couldn't get deleted!", "ERROR")
        );
        this.logService.showNotification(
          new Notification(error.message, "ERROR")
        );

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }
}
