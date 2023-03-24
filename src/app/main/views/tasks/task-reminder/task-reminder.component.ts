import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { TaskDetailsComponent } from "../task-details/task-details.component";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";
import { TaskReminderService } from "./tasks-reminder.service";
import { ConfirmationDialogBox, TaskReminder } from "src/app/shared/models";
import { CONFIRMATION_POPUP_STYLE, TASK_DETAILS_FORM_STYLE } from "src/configs";

@Component({
  selector: "app-task-reminder",
  templateUrl: "./task-reminder.component.html",
  styleUrls: ["./task-reminder.component.scss"],
  providers: [TaskReminderService],
})
export class TaskReminderComponent {
  @Input() taskReminder: TaskReminder = null;
  @Input() userId: string = null;

  constructor(
    private taskReminderService: TaskReminderService,
    private dialog: MatDialog
  ) {}

  public onClickTaskReminderDetails(): void {
    const dialogRef = this.dialog.open(
      TaskDetailsComponent,
      TASK_DETAILS_FORM_STYLE
    );
    dialogRef.componentInstance.task = this.taskReminder.task;
    dialogRef.componentInstance.userId = this.userId;
  }

  public onClickTaskReminderDelete(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox("DELETE_TASK_REMINDER", "YES/NO");
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.taskReminderService.handleDeleteTaskReminder(
          this.taskReminder.task,
          this.userId
        );
      }
    });
  }
}
