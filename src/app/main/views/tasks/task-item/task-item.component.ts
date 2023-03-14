import { Component, Input } from "@angular/core";
import { Task } from "src/app/shared/models";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent {
  @Input("task") task: Task | null = null;
}
