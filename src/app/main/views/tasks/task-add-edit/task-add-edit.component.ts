import { DialogRef } from "@angular/cdk/dialog";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Log, Notification } from "src/app/shared/models";
import { Task, TaskGroup } from "src/app/shared/models/task/task.model";
import {
  AppMonitoringService,
  DataFlowService,
  DatabaseService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import { userTasksGroups } from "src/assets/data";

@Component({
  selector: "app-task-add-edit",
  templateUrl: "./task-add-edit.component.html",
  styleUrls: ["./task-add-edit.component.scss"],
})
export class TaskAddEditComponent {
  @Input() public userId: string = "";
  @Input() public task: Task | null = null;
  public formGroupEl: FormGroup;
  public isDataFetching: boolean = false;
  private appMonitoringSubscription: Subscription = new Subscription();
  public taskGroups: TaskGroup[] = userTasksGroups;

  constructor(
    private logService: LogService,
    private appMonitoringService: AppMonitoringService,
    private dataFlowService: DataFlowService,
    private utilityService: UtilityService,
    private databaseService: DatabaseService,
    private dialogRef: DialogRef<TaskAddEditComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.appMonitoringSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.handleClosing();
  }

  private initForm(): void {
    this.formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: this.task ? this.task.title : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_TITLE")
          ),
        ]
      ),
      group: new FormControl(
        {
          value: this.task ? this.task.group : "",
          disabled: this.isDataFetching,
        },
        [Validators.required]
      ),
      deadline: new FormControl(
        {
          value: this.task ? this.task.deadline : "",
          disabled: this.isDataFetching,
        },
        [Validators.required]
      ),
      description: new FormControl(
        {
          value: this.task ? this.task.description : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(5),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_DESCRIPTION")
          ),
        ]
      ),
      webLink: new FormControl(
        {
          value: this.task ? this.task.webLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(10),
          Validators.maxLength(2048),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
      imageLink: new FormControl(
        {
          value: this.task ? this.task.imageLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(10),
          Validators.maxLength(2048),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
      videoLink: new FormControl(
        {
          value: this.task ? this.task.videoLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(10),
          Validators.maxLength(2048),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
      voiceLink: new FormControl(
        {
          value: this.task ? this.task.voiceLink : "",
          disabled: this.isDataFetching,
        },
        [
          Validators.minLength(10),
          Validators.maxLength(2048),
          Validators.pattern(
            this.utilityService.getValidationPattern("WEB_LINK")
          ),
        ]
      ),
    });
  }

  public onClickSubmit() {
    const taskSubmitted: Task = new Task(
      this.utilityService.randomIdGenerator(20, "MIXED", ""),
      this.formGroupEl.controls["title"].value,
      this.formGroupEl.controls["group"].value,
      this.formGroupEl.controls["deadline"].value,
      this.formGroupEl.controls["description"].value,
      this.formGroupEl.controls["webLink"].value,
      this.formGroupEl.controls["imageLink"].value,
      this.formGroupEl.controls["videoLink"].value,
      this.formGroupEl.controls["voiceLink"].value
    );

    // Reset the tid to its original if we are in Edit mode
    if (this.task) {
      taskSubmitted.tid = this.task.tid;
    }

    this.logService.logToConsole(new Log("SUBMITTED", "INFO"));
    this.logService.logToConsole(new Log(this.formGroupEl.value));

    if (this.task) {
      this.databaseService
        .updateUserTask(this.userId, taskSubmitted)
        .subscribe({
          next: (response: any) => {
            this.dataFlowService.updateUserTask(taskSubmitted);
            this.handleClosing();

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
    } else {
      this.databaseService.addUserTask(this.userId, taskSubmitted).subscribe({
        next: (response: any) => {
          this.dataFlowService.addUserTask(taskSubmitted);
          this.handleClosing();

          this.logService.logToConsole(
            new Log("User data synced successfully!", "INFO")
          );
          this.logService.logToConsole(new Log(response));
          this.logService.showNotification(
            new Notification("Task Added", "SUCCESS")
          );
        },
        error: (error: any) => {
          this.logService.logToConsole(
            new Log("Task could not get added!" + error.message, "ERROR")
          );
          this.logService.showNotification(
            new Notification(error.message, "ERROR")
          );

          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
    }
  }

  public onClickCancel(): void {
    this.handleClosing();
  }

  private handleClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.appMonitoringSubscription.unsubscribe();
    this.dialogRef.close();
  }
}
