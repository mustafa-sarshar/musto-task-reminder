import { Task } from "src/app/shared/models";

export const userTasks: Task[] = [
  new Task("0", "Task 1", "Description 1", new Date("01-01-2024"), false),
  new Task("1", "Task 2", "Description 2", new Date("01-01-2025"), false),
  new Task(
    "2",
    "Task 3",
    "Description 3",
    new Date("01-01-2026"),
    true,
    new Date("09-12-2022")
  ),
  new Task("3", "Task 4", "Description 4", new Date("01-01-2027"), false),
  new Task("4", "Task 5", "Description 5", new Date("01-01-2028"), false),
  new Task(
    "5",
    "Task 6",
    "Description 6",
    new Date("01-01-2029"),
    true,
    new Date("01-02-2023")
  ),
  new Task("6", "Task 7", "Description 7", new Date("01-11-2024"), false),
  new Task("7", "Task 8", "Description 8", new Date("10-11-2024"), false),
  new Task("8", "Task 9", "Description 9", new Date("01-01-2024"), false),
  new Task("9", "Task 10", "Description 10", new Date("01-01-2024"), false),
  new Task("10", "Task 11", "Description 11", new Date("01-01-2024"), false),
  new Task(
    "11",
    "Task 12",
    "Description 12",
    new Date("01-01-2024"),
    true,
    new Date("01-01-2023"),
    "Musto"
  ),
  new Task("12", "Task 13", "Description 13", new Date("01-01-2023"), false),
  new Task("13", "Task 14", "Description 14", new Date("05-08-2023"), false),
];
