import { Task } from "src/app/shared/models";
import { TaskGroup } from "src/app/shared/models/task/task.model";

export const userTasksGroups: TaskGroup[] = [
  new TaskGroup("0001", "Sport"),
  new TaskGroup("0002", "Education"),
  new TaskGroup("0003", "Hobbies"),
  new TaskGroup("0004", "Work"),
];
