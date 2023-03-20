import { Pipe, PipeTransform } from "@angular/core";

import { SortBy, Task } from "../../models";

@Pipe({
  name: "sortArray",
})
export class SortArrayPipe implements PipeTransform {
  transform(tasks: Task[], sortBy: SortBy): Task[] {
    let tasksSorted: Task[] = [...tasks];

    if (tasksSorted.length > 0) {
      switch (sortBy.sortByOption) {
        case "TITLE":
          tasksSorted.sort(this.compareTitles);
          break;
        case "DEADLINE":
          tasksSorted.sort(this.compareDeadlines);
          break;
        case "DONE_AT_DATE":
          tasksSorted.sort(this.compareDoneAtDate);
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
    if (t1.title < t2.title) {
      return -1;
    }
    if (t1.title > t2.title) {
      return 1;
    }
    return 0;
  }

  private compareDeadlines(t1: Task, t2: Task) {
    if (t1.deadline < t2.deadline) {
      return -1;
    }
    if (t1.deadline > t2.deadline) {
      return 1;
    }
    return 0;
  }

  private compareDoneAtDate(t1: Task, t2: Task) {
    if (!t1.doneAtDate || !t2.doneAtDate) {
      console.log(t1.doneAtDate, t2.doneAtDate);
    }
    if (t1.doneAtDate < t2.doneAtDate || !t1.doneAtDate) {
      return -1;
    }
    if (t1.doneAtDate > t2.doneAtDate || !t2.doneAtDate) {
      return 1;
    }
    return 0;
  }
}
