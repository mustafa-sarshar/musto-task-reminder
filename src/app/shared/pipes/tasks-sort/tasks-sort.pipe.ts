import { Pipe, PipeTransform } from "@angular/core";

import { SortBy, Task } from "../../models";

@Pipe({
  name: "tasksSort",
})
export class TasksSortPipe implements PipeTransform {
  transform(tasks: Task[], sortBy: SortBy): Task[] {
    let tasksSorted: Task[] = [...tasks];

    if (tasksSorted.length > 0) {
      switch (sortBy.sortByOption) {
        case "TITLE":
          tasksSorted.sort(this.compareTitles);
          break;
        case "DEADLINE":
          tasksSorted.sort(this.compareDeadline);
          break;
        case "COMPLETED":
          tasksSorted.sort(this.compareCompletion);
          break;
        default:
          break;
      }
    }

    if (sortBy.sortByType === "DES") {
      tasksSorted.reverse();
    }
    return tasksSorted;
  }

  private compareTitles(t1: Task, t2: Task): number {
    return t1.title.localeCompare(t2.title, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  private compareDeadline(t1: Task, t2: Task): number {
    if (t1.deadline < t2.deadline) {
      return -1;
    }
    if (t1.deadline > t2.deadline) {
      return 1;
    }
    return 0;
  }

  private compareCompletion(t1: Task, t2: Task): number {
    if (t1.completion && t2.completion) {
      if (t1.completion > t2.completion || !t2.completion) {
        return -1;
      }
      if (t1.completion < t2.completion || !t1.completion) {
        return 1;
      }
      return 0;
    }
    return 0;
  }
}
