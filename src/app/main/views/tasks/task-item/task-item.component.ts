import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { TaskDetailsComponent } from "../task-details/task-details.component";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import {
  AppMonitoringService,
  DataFlowService,
  DatabaseService,
  LogService,
} from "src/app/shared/services";
import { CONFIRMATION_POPUP_STYLE, TASK_DETAILS_FORM_STYLE } from "src/configs";
import {
  ConfirmationDialogBox,
  Log,
  Notification,
  Task,
} from "src/app/shared/models";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input("userId") userId: string | null = null;
  @Input("task") task: Task | null = null;
  private dataFlowServiceSubscription: Subscription = new Subscription();
  private logServiceSubscription: Subscription = new Subscription();

  constructor(
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService,
    private logService: LogService,
    private appMonitoringService: AppMonitoringService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.dataFlowServiceSubscription.unsubscribe();
    this.logServiceSubscription.unsubscribe();
  }

  public onClickDetails(): void {
    this.dialog.open(
      TaskDetailsComponent,
      TASK_DETAILS_FORM_STYLE
    ).componentInstance.task = this.task;
  }

  public onClickDelete(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox(
        "Be careful!",
        "Do you really want to delete this task?",
        "YES/NO"
      );
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.appMonitoringService.setIsDataFetchingStatus(true);

        this.databaseService
          .deleteUserTask(this.userId, this.task.tid)
          .subscribe({
            next: (response: any) => {
              this.logService.logToConsole(
                new Log("The task deleted from database successfully!", "INFO")
              );
              this.logService.logToConsole(new Log(response));
              this.logService.showNotification(
                new Notification("Task deleted successfully!", "SUCCESS")
              );

              this.dataFlowService.deleteUserTask(this.task.tid);
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
    });
  }

  public onClickToggleDone(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox(
        this.task.done ? "Be Careful!" : "Congratulations!",
        this.task.done ? "Is the task not done yet?" : "Is the task done?",
        "YES/NO"
      );
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.appMonitoringService.setIsDataFetchingStatus(true);
        if (this.task.done) {
          this.task.done = false;
          this.task.doneAtDate = null;
        } else {
          this.task.done = true;
          this.task.doneAtDate = new Date();
        }

        this.databaseService.updateUserTask(this.userId, this.task).subscribe({
          next: (response: any) => {
            this.logService.logToConsole(
              new Log("The task in database updated successfully!", "INFO")
            );
            this.logService.logToConsole(new Log(response));
            this.logService.showNotification(
              new Notification("Task updated successfully!", "SUCCESS")
            );

            this.dataFlowService.updateUserTask(this.task);
            this.appMonitoringService.setIsDataFetchingStatus(false);
          },
          error: (error) => {
            this.logService.logToConsole(
              new Log("The task couldn't get updated!", "ERROR")
            );
            this.logService.showNotification(
              new Notification(error.message, "ERROR")
            );

            this.appMonitoringService.setIsDataFetchingStatus(false);
          },
        });
      }
    });
  }
}
