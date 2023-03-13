import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { Subscription } from "rxjs";

import {
  AuthService,
  DatabaseService,
  LocalStorageService,
} from "src/app/shared/services";
import { Task, User } from "src/app/shared/models";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public userData: User | null = null;
  public userTasks: Task[] = [
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
  private authServiceSubscription: Subscription = new Subscription();
  private databaseServiceSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.userData.subscribe(
      (userData: User | null) => {
        this.userData = userData;
      }
    );
    this.databaseServiceSubscription = this.databaseService
      .getUserProfileDataFromDatabase(this.userData)
      .subscribe({
        next: (userData: User) => {
          this.userData.username = userData.username;
          this.userData.birthDate = userData.birthDate;
          this.userData.tasks = userData.tasks;
          this.localStorageService.storeUserDataOnLocalStorage(this.userData);
          this.authService.userData.next(this.userData);
          console.log(this.userData);
        },
        error: (error) => {
          console.error("Error", error);
        },
      });
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.databaseServiceSubscription.unsubscribe();
  }
}
