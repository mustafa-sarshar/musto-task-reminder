import { Pipe, PipeTransform } from "@angular/core";

import { Task } from "../../models";

@Pipe({
  name: "tasksFilter",
})
export class TasksFilterPipe implements PipeTransform {
  transform(tasks: Task[], filterCriteria: string, propName: string): Task[] {
    const _filterString = filterCriteria.trim().toLowerCase();

    const tasksFiltered = tasks.filter((task) =>
      task[propName].trim().toLowerCase().includes(_filterString)
    );

    return tasksFiltered;
  }
}
