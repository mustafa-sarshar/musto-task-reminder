import { Component, Input } from "@angular/core";
import { DialogRef } from "@angular/cdk/dialog";
import { MatDialog } from "@angular/material/dialog";

import { TaskAddEditComponent } from "../task-add-edit/task-add-edit.component";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import { TaskDetailsService } from "./task-details.service";
import { ConfirmationDialogBox, Task } from "src/app/shared/models";
import { CONFIRMATION_POPUP_STYLE, TASK_DETAILS_FORM_STYLE } from "src/configs";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.scss"],
  providers: [TaskDetailsService],
})
export class TaskDetailsComponent {
  @Input() public task: Task = null;
  @Input() public userId: string = null;

  constructor(
    private taskDetailsService: TaskDetailsService,
    private dialogRef: DialogRef<TaskDetailsComponent>,
    private dialog: MatDialog
  ) {}

  public onClickOk(): void {
    this.dialogRef.close();
  }

  public onClickLink(url: string): void {
    window.open(url, "_blank");
  }

  public onClickEdit(): void {
    const dialogRef = this.dialog.open(
      TaskAddEditComponent,
      TASK_DETAILS_FORM_STYLE
    );
    dialogRef.componentInstance.task = this.task;
    dialogRef.componentInstance.userId = this.userId;
    this.dialogRef.close();
  }

  public onClickDone() {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox("FINISH_THE_TASK", "YES/NO");
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.dialogRef.close();

        const taskUpdate: Task = Object.create(
          Object.getPrototypeOf(this.task),
          Object.getOwnPropertyDescriptors(this.task)
        );
        taskUpdate.done = true;
        taskUpdate.remindMe = false;
        taskUpdate.completion = new Date();

        this.taskDetailsService.handleDone(this.userId, taskUpdate);
      }
    });
  }
}
