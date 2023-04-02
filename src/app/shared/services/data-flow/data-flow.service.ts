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
  UserDataFromLocalStorage,
} from "../../models";
import { MAX_TIMEOUT_DURATION } from "src/configs";

@Injectable({ providedIn: "root" })
export class DataFlowService implements OnDestroy {
  public userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public appLanguage: BehaviorSubject<LanguageCode> =
    new BehaviorSubject<LanguageCode>("en-US");
  public taskGroups?: BehaviorSubject<TaskGroup[] | null> = new BehaviorSubject<
    TaskGroup[] | null
  >(null);
  public taskReminders: BehaviorSubject<TaskReminder[] | null> =
    new BehaviorSubject<TaskReminder[] | null>(null);
  public taskReminderPopupTimeoutsRefs: any = {};
  private userProfileFromDatabaseSubscription?: Subscription;
  private taskGroupsTranslateSubscription?: Subscription;

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
    this.taskGroupsTranslateSubscription?.unsubscribe();
    this.userProfileFromDatabaseSubscription?.unsubscribe();
  }

  public setUserData(userData: User | null): void {
    this.userData?.next(userData);
    if (userData) {
      this.localStorageService.storeUserDataOnLocalStorage(userData);
      if (userData.tasks) {
        this.initTaskReminders(userData.tasks);
      }
    }

    this.logService.logToConsole(new Log("UserData SET", "INFO"));
    this.logService.logToConsole(new Log(userData));
  }

  public addUserTask(task: Task): void {
    const userData = this.getUserData();
    if (userData) {
      if (userData.tasks) {
        userData.tasks = [...userData.tasks, task];
      } else {
        userData.tasks = [task];
      }

      this.setUserData(userData);
    }

    this.logService.logToConsole(new Log("Task Added", "INFO"));
    this.logService.logToConsole(new Log(task));
  }

  public deleteUserTask(taskId: string): void {
    const userData = this.getUserData();
    if (userData && userData.tasks) {
      const tasksFiltered = userData.tasks.filter(
        (task: Task) => task.tid !== taskId
      );
      userData.tasks = [...tasksFiltered];
      this.setUserData(userData);
    }

    this.logService.logToConsole(new Log("Task Deleted", "INFO"));
    this.logService.logToConsole(new Log(taskId));
  }

  public deleteUserTasksAll(): void {
    const userData = this.getUserData();
    if (userData) {
      userData.tasks = undefined;

      this.logService.logToConsole(new Log("All Tasks Deleted", "INFO"));
      this.setUserData(userData);
    } else {
      this.logService.logToConsole(
        new Log("There are no tasks to delete!", "WARN")
      );
    }
  }

  public updateUserTask(userTask: Task): void {
    const userData = this.getUserData();
    if (userData && userData.tasks) {
      const userDataFiltered = userData.tasks.filter(
        (task: Task) => task.tid !== userTask.tid
      );
      userData.tasks = [...userDataFiltered, userTask];
      this.deleteTaskReminderPopupTimeout(userTask.tid);
      this.setUserData(userData);
    }

    this.logService.logToConsole(new Log("Task updated", "INFO"));
    this.logService.logToConsole(new Log(userTask.tid));
  }

  public getUserData(): User | null {
    const userData: UserDataFromLocalStorage | null =
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
        next: (response: any) => {
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
            this.taskGroups?.next(taskGroupsList);

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

  public getTaskReminders(): TaskReminder[] | null {
    const taskReminders: TaskReminder[] | null = this.taskReminders.getValue();
    if (taskReminders) {
      return taskReminders.slice();
    } else {
      return null;
    }
  }

  public setTaskReminders(taskReminders: TaskReminder[]): void {
    this.taskReminders.next(taskReminders.slice());
    this.setTaskReminderPopups(taskReminders);
  }

  public initTaskReminders(tasks: Task[]): void {
    let taskReminders: TaskReminder[] = [];

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

    this.setTaskReminders(taskReminders.slice());
  }

  public addTaskReminder(taskReminder: TaskReminder): void {
    let taskReminders = this.getTaskReminders();

    if (taskReminders) {
      taskReminders.push(taskReminder);
      this.setTaskReminders([...taskReminders]);
    }
  }

  public removeReminderFromTask(task: Task): void {
    const userData: User | null = this.getUserData();

    if (userData) {
      if (userData.tasks) {
        userData.tasks.forEach((t: Task) => {
          if (t.tid === task.tid) {
            t.remindMe = false;
          }
        });
      }

      this.setUserData(userData);
    }
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
    const userData = this.userData?.getValue();
    if (userData && userData.uid) {
      for (let i = 0; i < taskReminders.length; i++) {
        this.addTaskReminderPopupTimeout(taskReminders[i], userData.uid);
      }
    }
  }

  public getTaskReminderTimeout(taskId: string): any {
    return this.taskReminderPopupTimeoutsRefs[taskId];
  }

  public addTaskReminderPopupTimeout(
    taskReminder: TaskReminder,
    userId: string
  ): void {
    if (!this.taskReminderPopupTimeoutsRefs[taskReminder.task.tid]) {
      if (taskReminder.task.reminder) {
        const timeoutDuration = this.utilityService.getTimeLeft(
          taskReminder.task.reminder
        );
        if (timeoutDuration.total < MAX_TIMEOUT_DURATION) {
          const timeOutRef = setTimeout(() => {
            this.logService.logToConsole(
              new Log(
                `${taskReminder.task.title} popped up after ${timeoutDuration.total} ms!!!`,
                "INFO"
              )
            );
            this.deleteTaskReminder(taskReminder.task, userId);
            this.dialog.open(
              TaskReminderPopupComponent
            ).componentInstance.task = taskReminder.task;
          }, timeoutDuration.total);

          this.taskReminderPopupTimeoutsRefs[taskReminder.task.tid] =
            timeOutRef;
          this.logService.logToConsole(
            new Log(
              `Task Reminder Timeout added! It will last after ${timeoutDuration.total} ms!!!`,
              "INFO"
            )
          );
          this.logService.logToConsole(
            new Log(this.taskReminderPopupTimeoutsRefs)
          );
        } else {
          this.logService.logToConsole(
            new Log(
              `Task Reminder Timeout passed the threshold ${MAX_TIMEOUT_DURATION} ms! ${timeoutDuration.total} ms!!!`,
              "WARN"
            )
          );
        }
      }
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
