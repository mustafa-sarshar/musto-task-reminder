import { DialogRef } from "@angular/cdk/dialog";
import { Component, Input } from "@angular/core";

import { Task } from "src/app/shared/models";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.scss"],
})
export class TaskDetailsComponent {
  @Input() public task: Task | null = null;

  constructor(private dialogRef: DialogRef<TaskDetailsComponent>) {}

  public onClickOk(): void {
    this.dialogRef.close();
  }

  public onClickLink(url: string): void {
    window.open(url, "_blank");
  }
}
