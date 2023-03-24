import { Injectable } from "@angular/core";

import {
  AppMonitoringService,
  DataFlowService,
  DatabaseService,
  LogService,
} from "src/app/shared/services";
import { Log, Notification, Task } from "src/app/shared/models";

@Injectable()
export class TaskReminderService {
  constructor(
    private logService: LogService,
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService,
    private appMonitoringService: AppMonitoringService
  ) {}

  public handleDeleteTaskReminder(task: Task, userId: string): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    const taskUpdate = Object.assign(
      Object.create(Object.getPrototypeOf(task)),
      task
    );
    taskUpdate.remindMe = false;
    this.databaseService.updateUserTask(userId, taskUpdate).subscribe({
      next: (response) => {
        this.logService.logToConsole(
          new Log(
            "The task reminder deleted from database successfully!",
            "INFO"
          )
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("DELETE_TASK_REMINDER", "SUCCESS")
        );

        this.dataFlowService.deleteTaskReminder(task.tid);
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
      error: (error) => {
        this.logService.logToConsole(
          new Log("The task reminder couldn't get deleted!", "ERROR")
        );
        this.logService.showNotification(
          new Notification("DELETE_TASK_REMINDER", "ERROR")
        );
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }
}
