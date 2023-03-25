import { Pipe, PipeTransform } from "@angular/core";

import { Task, TasksVisibilityFilterType } from "../../models";

@Pipe({
  name: "tasksVisibilityFilter",
})
export class TasksVisibilityFilterPipe implements PipeTransform {
  transform(
    tasks: Task[],
    visibilityFilterType: TasksVisibilityFilterType
  ): Task[] {
    let tasksFiltered: Task[] = [];

    switch (visibilityFilterType) {
      case "ALL":
        tasksFiltered = [...tasks];
        break;
      case "COMPLETED":
        tasksFiltered = tasks.filter((task) => task["done"] === true);
        break;
      case "OPEN":
        tasksFiltered = tasks.filter(
          (task) => task["done"] === false || task["done"] === undefined
        );
        break;
      default:
        break;
    }

    return tasksFiltered;
  }
}
