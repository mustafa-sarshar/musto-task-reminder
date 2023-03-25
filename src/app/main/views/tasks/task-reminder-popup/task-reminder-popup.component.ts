import { DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { Task } from "src/app/shared/models";

@Component({
  selector: "app-task-reminder-popup",
  templateUrl: "./task-reminder-popup.component.html",
  styleUrls: ["./task-reminder-popup.component.scss"],
})
export class TaskReminderPopupComponent {
  public task: Task = null;

  constructor(private dialogRef: DialogRef<TaskReminderPopupComponent>) {}

  public onClickDismiss(): void {
    this.dialogRef.close();
  }
}
