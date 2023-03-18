import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

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
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input("userId") userId: string | null = null;
  @Input("task") task: Task | null = null;
  public taskItemMode: number = 0;
  private dataFlowServiceSubscription: Subscription = new Subscription();
  private logServiceSubscription: Subscription = new Subscription();

  constructor(
    private taskItemService: TaskItemService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.dataFlowServiceSubscription.unsubscribe();
    this.logServiceSubscription.unsubscribe();
  }

  public onClickMore(): void {
    this.taskItemMode = 1;
  }

  public onClickLess(): void {
    this.taskItemMode = 0;
  }

  public onClickDetails(): void {
    this.dialog.open(
      TaskDetailsComponent,
      TASK_DETAILS_FORM_STYLE
    ).componentInstance.task = this.task;
    this.taskItemMode = 0;
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
        this.task.done ? "Be Careful!" : "Congratulations!",
        this.task.done ? "Is the task not done yet?" : "Is the task done?",
        "YES/NO"
      );
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        if (this.task.done) {
          this.task.done = false;
          this.task.doneAtDate = null;
        } else {
          this.task.done = true;
          this.task.doneAtDate = new Date();
        }
        this.taskItemService.handleToggleDone(this.userId, this.task);
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
