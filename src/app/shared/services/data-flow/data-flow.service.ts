import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { UtilityService } from "../utility/utility.service";
import { LogService } from "../log/log.service";
import { DatabaseService } from "../database/database.service";

import {
  LanguageCode,
  Log,
  Notification,
  Task,
  TaskGroup,
  TaskReminder,
  User,
  UserDataFromDatabase,
  UserDataFromLocalStorage,
} from "../../models";
import { AppMonitoringService } from "../app-monitoring/app-monitoring.service";
import { CookieServiceService } from "../cookie-service/cookie-service.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: "root" })
export class DataFlowService implements OnDestroy {
  public userData: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public appLanguage: BehaviorSubject<LanguageCode> =
    new BehaviorSubject<LanguageCode>("en-US");
  public taskGroups: BehaviorSubject<TaskGroup[]> = new BehaviorSubject<
    TaskGroup[]
  >(null);
  public taskReminders: BehaviorSubject<TaskReminder[]> = new BehaviorSubject<
    TaskReminder[]
  >(null);
  private userProfileFromDatabaseSubscription: Subscription =
    new Subscription();
  private taskGroupsTranslateSubscription: Subscription = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private logService: LogService,
    private databaseService: DatabaseService,
    private appMonitoringService: AppMonitoringService,
    private translateService: TranslateService,
    private cookieService: CookieServiceService
  ) {}

  public ngOnDestroy(): void {
    this.taskGroupsTranslateSubscription.unsubscribe();
    this.userProfileFromDatabaseSubscription.unsubscribe();
  }

  public setUserData(userData: User): void {
    this.userData.next(userData);
    if (userData) {
      this.localStorageService.storeUserDataOnLocalStorage(userData);
      this.initTaskReminders(userData.tasks);
    }

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
    this.userProfileFromDatabaseSubscription = this.databaseService
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
          if (syncData) {
            this.logService.showNotification(
              new Notification("SYNC_DATA", "SUCCESS")
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
          } else {
            userData.tasks = undefined;
          }

          this.setUserData(userData);
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
        error: (error) => {
          this.logService.logToConsole(
            new Log("getUserProfileDataFromDatabase" + error.message, "ERROR")
          );
          if (syncData) {
            this.logService.showNotification(
              new Notification("SYNC_DATA", "ERROR")
            );
          }

          this.setUserData(userData);
          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
  }

  public syncUserData(): void {
    const userData = this.getUserData();
    if (userData) {
      this.initUserProfileData(userData, true);
    }
  }

  public initAppLanguage(): void {
    this.setAppLanguage(this.getAppLanguage());
    this.initTaskGroups();

    this.logService.logToConsole(
      new Log("App Language initialized: " + this.appLanguage.getValue())
    );
  }

  public setAppLanguage(selectedLanguage: LanguageCode): void {
    this.appLanguage.next(selectedLanguage);
    this.cookieService.setCookie("appLanguage", selectedLanguage, 10);
    this.localStorageService.storeAppLanguageOnLocalStorage(selectedLanguage);
  }

  public getAppLanguage(): LanguageCode {
    const appLanguage = this.cookieService.getCookie(
      "appLanguage"
    ) as LanguageCode;
    if (appLanguage) {
      return appLanguage;
    } else {
      return this.localStorageService.getAppLanguageFromLocalStorage();
    }
  }

  public applyAppLanguage(): void {
    this.translateService.use(this.getAppLanguage());
    this.initTaskGroups();
  }

  public initTaskGroups(): void {
    let taskGroupsList: TaskGroup[] = [];

    this.taskGroupsTranslateSubscription = this.translateService
      .get("TASK_GROUPS")
      .subscribe({
        next: (taskGroups) => {
          if (taskGroups) {
            for (let key in taskGroups) {
              taskGroupsList.push(new TaskGroup(key, taskGroups[key]));
            }
            this.taskGroups.next(taskGroupsList);

            this.logService.logToConsole(
              new Log("TaskGroups got initialized!", "INFO")
            );
            this.logService.logToConsole(new Log(taskGroupsList));
          }
        },
        error: (error) => {
          this.logService.logToConsole(
            new Log("TaskGroups could not get initialized!", "ERROR")
          );
          this.logService.logToConsole(new Log(error.message));
        },
      });
  }

  public getTaskReminders(): TaskReminder[] {
    return this.taskReminders.getValue().slice();
  }

  public setTaskReminders(taskReminders: TaskReminder[]): void {
    this.taskReminders.next([...taskReminders]);
  }

  public initTaskReminders(tasks: Task[]): void {
    const taskReminders: TaskReminder[] = [];

    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].remindMe) {
          taskReminders.push(
            new TaskReminder(
              this.utilityService.randomIdGenerator(5, "MIXED"),
              tasks[i]
            )
          );
        }
      }
    }

    this.setTaskReminders(taskReminders);
  }

  public addTaskReminder(taskReminder: TaskReminder): void {
    let taskReminders = this.getTaskReminders();
    taskReminders = [...taskReminders, taskReminder];

    this.setTaskReminders(taskReminders);
  }

  public deleteTaskReminder(tid: string): void {
    const userData: User = this.getUserData();

    if (userData.tasks) {
      userData.tasks.forEach((task: Task) => {
        if (task.tid === tid) {
          task.remindMe = false;
        }
      });
    }

    this.setUserData(userData);
  }
}
