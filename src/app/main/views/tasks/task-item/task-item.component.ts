import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { TaskDetailsComponent } from "../task-details/task-details.component";
import { TaskAddEditComponent } from "../task-add-edit/task-add-edit.component";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import { TaskItemService } from "./task-item.service";
import { ConfirmationDialogBox, Task } from "src/app/shared/models";
import { CONFIRMATION_POPUP_STYLE, TASK_DETAILS_FORM_STYLE } from "src/configs";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
  providers: [TaskItemService],
})
export class TaskItemComponent {
  @Input("userId") userId: string = null;
  @Input("task") task: Task = null;
  public taskItemMode: number = 0;

  constructor(
    private taskItemService: TaskItemService,
    private dialog: MatDialog
  ) {}

  public onClickMore(): void {
    this.taskItemMode = 1;
  }

  public onClickLess(): void {
    this.taskItemMode = 0;
  }

  public onClickDetails(): void {
    const dialogRef = this.dialog.open(
      TaskDetailsComponent,
      TASK_DETAILS_FORM_STYLE
    );
    dialogRef.componentInstance.task = this.task;
    dialogRef.componentInstance.userId = this.userId;

    this.taskItemMode = 0;
  }

  public onClickDelete(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox("DELETE_TASK", "YES/NO");
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.taskItemService.handleDeleteTask(this.userId, this.task.tid);
      }
    });
    this.taskItemMode = 0;
  }

  public onClickToggleDone(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox(
        this.task.done ? "OPEN_THE_TASK" : "FINISH_THE_TASK",
        "YES/NO"
      );
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        const taskUpdate: Task = Object.create(
          Object.getPrototypeOf(this.task),
          Object.getOwnPropertyDescriptors(this.task)
        );

        if (taskUpdate.done) {
          taskUpdate.done = false;
          taskUpdate.completion = null;
        } else {
          taskUpdate.done = true;
          taskUpdate.remindMe = false;
          taskUpdate.completion = new Date();
        }
        this.taskItemService.handleToggleDone(this.userId, taskUpdate);
      }
    });
    this.taskItemMode = 0;
  }

  public onClickEdit(): void {
    const dialogRef = this.dialog.open(
      TaskAddEditComponent,
      TASK_DETAILS_FORM_STYLE
    );
    dialogRef.componentInstance.task = this.task;
    dialogRef.componentInstance.userId = this.userId;
    this.taskItemMode = 0;
  }
}
