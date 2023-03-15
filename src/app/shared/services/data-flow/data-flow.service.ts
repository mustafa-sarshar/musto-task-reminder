import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { UtilityService } from "../utility/utility.service";
import { LogService } from "../log/log.service";
import { DatabaseService } from "../database/database.service";

import {
  Log,
  Task,
  User,
  UserDataFromDatabase,
  UserDataFromLocalStorage,
} from "../../models";
import { userTasks } from "src/assets/data";

@Injectable({
  providedIn: "root",
})
export class DataFlowService {
  public userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private logService: LogService,
    private databaseService: DatabaseService
  ) {}

  public setUserData(userData: User | null): void {
    this.userData.next(userData);
    this.localStorageService.storeUserDataOnLocalStorage(userData);

    this.logService.logToConsole(new Log("UserData SET", "INFO"));
    this.logService.logToConsole(new Log(userData));
  }

  public addUserTask(task: Task): void {
    const userData = this.getUserData();
    if (userData.tasks) {
      userData.tasks = [...userData.tasks, task];
    } else {
      userData.tasks = [task];
    }

    this.logService.logToConsole(new Log("Task Added", "INFO"));
    this.logService.logToConsole(new Log(task));
    this.setUserData(userData);
  }

  public getUserData(): User | null {
    const userData: UserDataFromLocalStorage =
      this.localStorageService.getUserDataFromLocalStorage();
    if (userData) {
      return this.utilityService.convertUserDataFormat(userData);
    } else {
      return null;
    }
  }

  public initUserProfileData(userData: User) {
    this.databaseService
      .getUserProfileDataFromDatabase(userData.uid)
      .subscribe({
        next: (response: UserDataFromDatabase) => {
          this.logService.logToConsole(
            new Log(
              "User profile data loaded from database successfully!",
              "INFO"
            )
          );
          this.logService.logToConsole(new Log(response));

          userData.uid = response.uid;
          userData.username = response.username;
          userData.birthDate = new Date(response.birthDate);
          if (response.tasks) {
            const tasksLoaded = Object.keys(response.tasks).map(
              (key) => response.tasks[key]
            );
            userData.tasks = tasksLoaded;
          }
          this.setUserData(userData);
        },
        error: (error) => {
          this.logService.logToConsole(
            new Log("getUserProfileDataFromDatabase" + error.message, "ERROR")
          );

          this.setUserData(userData);
        },
      });
  }
}
