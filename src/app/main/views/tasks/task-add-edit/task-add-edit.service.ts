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

@Injectable({
  providedIn: "root",
})
export class TaskAddEditService implements OnInit, OnDestroy {
  private isDataFetching: boolean = false;
  private appMonitoringServiceSubscription: Subscription = new Subscription();

  constructor(
    private utilityService: UtilityService,
    private appMonitoringService: AppMonitoringService,
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService,
    private logService: LogService
  ) {}

  public ngOnInit(): void {
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetching.subscribe(
        (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        }
      );
  }

  public ngOnDestroy(): void {
    this.appMonitoringServiceSubscription.unsubscribe();
  }

  public initForm(task: Task): FormGroup {
    const formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: task ? task.title : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.required,
          Validators.minLength(
            this.utilityService.getValidationLengthMin("TASK_TITLE")
          ),
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("TASK_TITLE")
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
      deadline: new FormControl(
        {
          value: task ? task.deadline : "",
          disabled: this.isDataFetching,
        },
        [Validators.required, this.utilityService.validateDateMin]
      ),
      description: new FormControl(
        {
          value: task ? task.description : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(
            this.utilityService.getValidationLengthMin("TASK_DESCRIPTION")
          ),
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("TASK_DESCRIPTION")
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
            this.utilityService.getValidationLengthMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("WEB_LINK")
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
            this.utilityService.getValidationLengthMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("WEB_LINK")
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
            this.utilityService.getValidationLengthMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("WEB_LINK")
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
            this.utilityService.getValidationLengthMin("WEB_LINK")
          ),
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("WEB_LINK")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
    });
    return formGroupEl;
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
        callbackSuccess();

        this.logService.logToConsole(
          new Log("User data synced successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("Task Updated", "SUCCESS")
        );
      },
      error: (error: any) => {
        this.logService.logToConsole(
          new Log("Task could not get updated!" + error.message, "ERROR")
        );
        this.logService.showNotification(
          new Notification(error.message, "ERROR")
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
        callbackSuccess();

        this.logService.logToConsole(
          new Log("User data synced successfully!", "INFO")
        );
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("Task Added", "SUCCESS")
        );
      },
      error: (error: any) => {
        this.appMonitoringService.setIsDataFetchingStatus(false);

        this.logService.logToConsole(
          new Log("Task could not get added!" + error.message, "ERROR")
        );
        this.logService.showNotification(
          new Notification(error.message, "ERROR")
        );
      },
    });
  }
}
