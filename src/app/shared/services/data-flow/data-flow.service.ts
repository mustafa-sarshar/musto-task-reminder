import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { TaskReminderPopupComponent } from "src/app/main/views/tasks/task-reminder-popup/task-reminder-popup.component";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { UtilityService } from "../utility/utility.service";
import { LogService } from "../log/log.service";
import { DatabaseService } from "../database/database.service";
import { CookieServiceService } from "../cookie-service/cookie-service.service";
import { AppMonitoringService } from "../app-monitoring/app-monitoring.service";

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
  public taskReminderPopupTimeoutsRefs: {} = {};
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
    private cookieService: CookieServiceService,
    private dialog: MatDialog
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
      this.deleteTaskReminderPopupTimeout(userTask.tid);
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
    this.taskReminders.next(taskReminders.slice());
    this.setTaskReminderPopups(taskReminders);
  }

  public initTaskReminders(tasks: Task[]): void {
    let taskReminders: TaskReminder[] = [];

    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].remindMe) {
          taskReminders.push(
            new TaskReminder(
              this.utilityService.getRandomId(20, "MIXED"),
              tasks[i]
            )
          );
        }
      }
    }

    this.setTaskReminders(taskReminders.slice());
  }

  public addTaskReminder(taskReminder: TaskReminder): void {
    let taskReminders = this.getTaskReminders();
    taskReminders.push(taskReminder);

    this.setTaskReminders([...taskReminders]);
  }

  public removeReminderFromTask(task: Task): void {
    const userData: User = this.getUserData();

    if (userData.tasks) {
      userData.tasks.forEach((t: Task) => {
        if (t.tid === task.tid) {
          t.remindMe = false;
        }
      });
    }

    this.setUserData(userData);
  }

  public deleteTaskReminder(task: Task, userId: string): void {
    const taskUpdate = Object.assign(
      Object.create(Object.getPrototypeOf(task)),
      task
    );
    taskUpdate.remindMe = false;
    this.databaseService.updateUserTask(userId, taskUpdate).subscribe({
      next: (response) => {
        this.logService.logToConsole(
          new Log(
            "The task reminder deleted from database successfully!",
            "INFO"
          )
        );
        this.logService.logToConsole(new Log(response));
        // this.logService.showNotification(
        //   new Notification("DELETE_TASK_REMINDER", "SUCCESS")
        // );

        this.removeReminderFromTask(task);
        this.deleteTaskReminderPopupTimeout(task.tid);
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
      error: (error) => {
        this.logService.logToConsole(
          new Log("The task reminder couldn't get deleted!", "ERROR")
        );
        this.logService.showNotification(
          new Notification("DELETE_TASK_REMINDER", "ERROR")
        );
        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }

  public setTaskReminderPopups(taskReminders: TaskReminder[]): void {
    for (let i = 0; i < taskReminders.length; i++) {
      this.addTaskReminderPopupTimeout(taskReminders[i]);
    }
  }

  public getTaskReminderTimeout(taskId: string): any {
    return this.taskReminderPopupTimeoutsRefs[taskId];
  }

  public addTaskReminderPopupTimeout(taskReminder: TaskReminder): void {
    if (!this.taskReminderPopupTimeoutsRefs[taskReminder.task.tid]) {
      const timeOutRef = setTimeout(() => {
        console.log(taskReminder.task.title + "POPUP");
        this.deleteTaskReminder(
          taskReminder.task,
          this.userData.getValue().uid
        );
        this.dialog.open(TaskReminderPopupComponent).componentInstance.task =
          taskReminder.task;
      }, this.utilityService.getTimeLeft(new Date(taskReminder.task.reminder)).total);
      this.taskReminderPopupTimeoutsRefs[taskReminder.task.tid] = timeOutRef;
      this.logService.logToConsole(
        new Log("Task Reminder Timeout added!", "INFO")
      );
      this.logService.logToConsole(new Log(this.taskReminderPopupTimeoutsRefs));
    } else {
      this.logService.logToConsole(
        new Log("Task Reminder Timeout was added before!", "INFO")
      );
      this.logService.logToConsole(new Log(this.taskReminderPopupTimeoutsRefs));
    }
  }

  public deleteTaskReminderPopupTimeout(taskId: string): void {
    if (this.taskReminderPopupTimeoutsRefs[taskId]) {
      clearTimeout(this.taskReminderPopupTimeoutsRefs[taskId]);
      delete this.taskReminderPopupTimeoutsRefs[taskId];
    }
  }

  public resetAllTaskReminderPopupTimeouts(): void {
    // for (let i = 0; i < this.taskReminderPopupTimeoutsRefs.length; i++) {
    //   clearTimeout(this.taskReminderPopupTimeoutsRefs[i]);
    //   this.taskReminderPopupTimeoutsRefs = null;
    // }
  }
}
