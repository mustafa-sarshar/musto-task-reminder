import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import {
  AppMonitoringService,
  DataFlowService,
  DatabaseService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import { Log, Notification, Task } from "src/app/shared/models";
import { Subscription } from "rxjs";

@Injectable()
export class TaskAddEditService implements OnInit, OnDestroy {
  private isDataFetching: boolean = false;
  private isDataFetchingSubscription?: Subscription;

  constructor(
    private utilityService: UtilityService,
    private appMonitoringService: AppMonitoringService,
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService,
    private logService: LogService
  ) {}

  public ngOnInit(): void {
    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe(
        (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        }
      );
  }

  public ngOnDestroy(): void {
    this.isDataFetchingSubscription?.unsubscribe();
  }

  public initForm(task: Task | null): FormGroup {
    const formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: task ? task.title : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.required,
          Validators.minLength(
            this.utilityService.getValidationMin("TASK_TITLE")
          ),
          Validators.maxLength(
            this.utilityService.getValidationMax("TASK_TITLE")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_TITLE")
          ),
        ]
      ),
      group: new FormControl(
        {
          value: task ? task.group : "",
          disabled: this.isDataFetching,
        },
        [Validators.required]
      ),
      deadlineDate: new FormControl(
        {
          value: task
            ? this.utilityService.parseDateToDateTimeStringObject(
                new Date(task.deadline)
              ).date
            : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.required,
          // this.utilityService.validateDeadlineDate
        ]
      ),
      deadlineTime: new FormControl(
        {
          value: task
            ? this.utilityService.parseDateToDateTimeStringObject(
                new Date(task.deadline)
              ).time
            : "23:59",
          disabled: this.isDataFetching,
        },
        [
          Validators.required,
          Validators.pattern(this.utilityService.getValidationPattern("TIME")),
        ]
      ),
      remindMe: new FormControl(
        {
          value: task && task.remindMe ? task.remindMe : false,
          disabled: this.isDataFetching,
        },
        []
      ),
      reminderDays: new FormControl(
        {
          value:
            task && task.remindMe && task.reminder
              ? this.utilityService.getTimeReminder(
                  new Date(task.reminder),
                  new Date(task.deadline)
                ).days
              : 0,
          disabled: this.isDataFetching,
        },
        [Validators.min(this.utilityService.getValidationMin("TIME_DAY"))]
      ),
      reminderHours: new FormControl(
        {
          value:
            task && task.remindMe && task.reminder
              ? this.utilityService.getTimeReminder(
                  new Date(task.reminder),
                  new Date(task.deadline)
                ).hours
              : 0,
          disabled: this.isDataFetching,
        },
        [
          Validators.min(this.utilityService.getValidationMin("TIME_HOUR")),
          Validators.max(this.utilityService.getValidationMax("TIME_HOUR")),
        ]
      ),
      reminderMinutes: new FormControl(
        {
          value:
            task && task.remindMe && task.reminder
              ? this.utilityService.getTimeReminder(
                  new Date(task.reminder),
                  new Date(task.deadline)
                ).minutes
              : 0,
          disabled: this.isDataFetching,
        },
        [
          Validators.min(this.utilityService.getValidationMin("TIME_MINUTE")),
          Validators.max(this.utilityService.getValidationMax("TIME_MINUTE")),
        ]
      ),
      description: new FormControl(
        {
          value: task ? task.description : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(
            this.utilityService.getValidationMin("TASK_DESCRIPTION")
          ),
          Validators.maxLength(
            this.utilityService.getValidationMax("TASK_DESCRIPTION")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_DESCRIPTION")
          ),
        ]
      ),
      webLink: new FormControl(
        {
          value: task ? task.webLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(
            this.utilityService.getValidationMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationMax("WEB_LINK")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
      imageLink: new FormControl(
        {
          value: task ? task.imageLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(
            this.utilityService.getValidationMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationMax("WEB_LINK")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
      videoLink: new FormControl(
        {
          value: task ? task.videoLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(
            this.utilityService.getValidationMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationMax("WEB_LINK")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
      voiceLink: new FormControl(
        {
          value: task ? task.voiceLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(
            this.utilityService.getValidationMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationMax("WEB_LINK")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
    });
    return formGroupEl;
  }

  public handleSubmittedData(formGroupEl: FormGroup): Task | null {
    const deadline: Date = this.utilityService.setTimeForDate(
      formGroupEl.controls["deadlineDate"].value,
      formGroupEl.controls["deadlineTime"].value
    );
    if (!this.utilityService.validateDeadline(deadline)) {
      this.logService.logToConsole(new Log("Deadline is not valid", "ERROR"));
      this.logService.logToConsole(new Log(deadline));
      this.logService.showNotification(new Notification("DEADLINE", "ERROR"));

      return null;
    }

    let reminder: Date | undefined = undefined;
    if (formGroupEl.controls["remindMe"].value === true) {
      reminder = this.utilityService.subtractTimeFromDate(
        deadline,
        +formGroupEl.controls["reminderDays"].value,
        +formGroupEl.controls["reminderHours"].value,
        +formGroupEl.controls["reminderMinutes"].value
      );

      if (!this.utilityService.validateReminder(deadline, reminder)) {
        this.logService.logToConsole(new Log("Not a valid reminder time!"));
        this.logService.showNotification(new Notification("REMINDER", "ERROR"));

        return null;
      }
    }

    const taskSubmitted: Task = new Task(
      this.utilityService.getRandomId(25, "MIXED", ""),
      formGroupEl.controls["title"].value,
      formGroupEl.controls["group"].value,
      deadline,
      formGroupEl.controls["remindMe"].value
        ? formGroupEl.controls["remindMe"].value
        : false,
      reminder,
      formGroupEl.controls["description"].value,
      formGroupEl.controls["webLink"].value,
      formGroupEl.controls["imageLink"].value,
      formGroupEl.controls["videoLink"].value,
      formGroupEl.controls["voiceLink"].value
    );

    return taskSubmitted;
  }

  public handleEditTask(
    userId: string,
    task: Task,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.databaseService.updateUserTask(userId, task).subscribe({
      next: (response: any) => {
        this.dataFlowService.updateUserTask(task);

        if (callbackSuccess) {
          callbackSuccess();
        }

        this.logService.logToConsole(
          new Log("User data synced successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("UPDATE_TASK", "SUCCESS")
        );
      },
      error: (error: any) => {
        this.logService.logToConsole(
          new Log("Task could not get updated!" + error.message, "ERROR")
        );
        this.logService.showNotification(
          new Notification("UPDATE_TASK", "ERROR")
        );

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }

  public handleAddTask(
    userId: string,
    task: Task,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.databaseService.addUserTask(userId, task).subscribe({
      next: (response: any) => {
        this.dataFlowService.addUserTask(task);

        if (callbackSuccess) {
          callbackSuccess();
        }

        this.logService.logToConsole(
          new Log("User data synced successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("ADD_TASK", "SUCCESS")
        );
      },
      error: (error: any) => {
        this.appMonitoringService.setIsDataFetchingStatus(false);

        this.logService.logToConsole(
          new Log("Task could not get added!" + error.message, "ERROR")
        );
        this.logService.showNotification(new Notification("ADD_TASK", "ERROR"));
      },
    });
  }
}
