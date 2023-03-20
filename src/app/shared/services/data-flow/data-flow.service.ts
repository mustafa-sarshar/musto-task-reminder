import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { UtilityService } from "../utility/utility.service";
import { LogService } from "../log/log.service";
import { DatabaseService } from "../database/database.service";

import {
  Log,
  Notification,
  Task,
  User,
  UserDataFromDatabase,
  UserDataFromLocalStorage,
} from "../../models";
import { AppMonitoringService } from "../app-monitoring/app-monitoring.service";

@Injectable({ providedIn: "root" })
export class DataFlowService {
  public userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private logService: LogService,
    private databaseService: DatabaseService,
    private appMonitoringService: AppMonitoringService
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

  public deleteUserTask(taskId: string): void {
    const userData = this.getUserData();
    if (userData.tasks) {
      const tasksFiltered = userData.tasks.filter(
        (task: Task) => task.tid !== taskId
      );
      userData.tasks = [...tasksFiltered];
    }

    this.logService.logToConsole(new Log("Task Deleted", "INFO"));
    this.logService.logToConsole(new Log(taskId));
    this.setUserData(userData);
  }

  public deleteUserTasksAll(): void {
    const userData = this.getUserData();
    userData.tasks = undefined;

    this.logService.logToConsole(new Log("All Tasks Deleted", "INFO"));
    this.setUserData(userData);
  }

  public updateUserTask(userTask: Task): void {
    const userData = this.getUserData();
    if (userData.tasks) {
      const userDataFiltered = userData.tasks.filter(
        (task: Task) => task.tid !== userTask.tid
      );
      userData.tasks = [...userDataFiltered, userTask];
    }

    this.logService.logToConsole(new Log("Task updated", "INFO"));
    this.logService.logToConsole(new Log(userTask.tid));
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

  public initUserProfileData(userData: User, syncData: boolean = false) {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.databaseService
      .getUserProfileDataFromDatabase(userData.uid)
      .subscribe({
        next: (response: UserDataFromDatabase) => {
          this.appMonitoringService.setIsDataFetchingStatus(false);
          this.logService.logToConsole(
            new Log(
              "User profile data loaded from database successfully!",
              "INFO"
            )
          );
          this.logService.logToConsole(new Log(response));
          if (syncData) {
            this.logService.showNotification(
              new Notification("Data got synced successfully!", "SUCCESS")
            );
          }

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
          this.appMonitoringService.setIsDataFetchingStatus(false);
          this.logService.logToConsole(
            new Log("getUserProfileDataFromDatabase" + error.message, "ERROR")
          );
          if (syncData) {
            this.logService.showNotification(
              new Notification("Data could not get synced!", "WARN")
            );
          }

          this.setUserData(userData);
        },
      });
  }

  public syncUserData(): void {
    const userData = this.getUserData();
    if (userData) {
      this.initUserProfileData(userData, true);
    }
  }
}
