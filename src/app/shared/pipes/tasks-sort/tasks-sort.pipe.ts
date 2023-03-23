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
          tasksSorted.sort(this.compareDeadlineDates);
          break;
        case "COMPLETED":
          tasksSorted.sort(this.compareCompletedDate);
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

  private compareTitles(t1: Task, t2: Task) {
    return t1.title.localeCompare(t2.title, undefined, {
      numeric: true,
      sensitivity: "base",
    });
    // if (t1.title < t2.title) {
    //   return -1;
    // }
    // if (t1.title > t2.title) {
    //   return 1;
    // }
    // return 0;
  }

  private compareDeadlineDates(t1: Task, t2: Task) {
    if (t1.deadlineDate < t2.deadlineDate) {
      return -1;
    }
    if (t1.deadlineDate > t2.deadlineDate) {
      return 1;
    }
    return 0;
  }

  private compareCompletedDate(t1: Task, t2: Task) {
    if (t1.completedDate > t2.completedDate || !t2.completedDate) {
      return -1;
    }
    if (t1.completedDate < t2.completedDate || !t1.completedDate) {
      return 1;
    }
    return 0;
  }
}
