import { DialogRef } from "@angular/cdk/dialog";
import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  DataFlowService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import { TaskAddEditService } from "./task-add-edit.service";
import { Log, Notification } from "src/app/shared/models";
import { Task, TaskGroup } from "src/app/shared/models/task/task.model";

@Component({
  selector: "app-task-add-edit",
  templateUrl: "./task-add-edit.component.html",
  styleUrls: ["./task-add-edit.component.scss"],
  providers: [TaskAddEditService],
})
export class TaskAddEditComponent {
  @Input() public userId: string = "";
  @Input() public task: Task | null = null;
  public formGroupEl: FormGroup;
  public isDataFetching: boolean = false;
  public taskGroups: TaskGroup[] = [];
  public remindMeFlag: boolean = false;
  private isDataFetchingServiceSubscription: Subscription = new Subscription();
  private taskGroupsSubscription: Subscription = new Subscription();

  constructor(
    private logService: LogService,
    private appMonitoringService: AppMonitoringService,
    private dataFlowService: DataFlowService,
    private taskAddEditService: TaskAddEditService,
    public utilityService: UtilityService,
    private dialogRef: DialogRef<TaskAddEditComponent>
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.taskAddEditService.initForm(this.task);
    if (this.task && this.task.remindMe) {
      this.remindMeFlag = true;
    }
    this.isDataFetchingServiceSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
    this.taskGroupsSubscription = this.dataFlowService.taskGroups.subscribe(
      (taskGroups: TaskGroup[]) => {
        this.taskGroups = taskGroups;
        console.log("taskGroups", taskGroups);
      }
    );
  }

  public ngOnDestroy(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.taskGroupsSubscription.unsubscribe();
    this.isDataFetchingServiceSubscription.unsubscribe();
  }

  public onChangeRemindMe(): void {
    this.remindMeFlag = !this.remindMeFlag;
    this.formGroupEl.patchValue({
      reminderDays: 0,
      reminderHours: 0,
      reminderMinutes: 0,
    });
  }

  public onClickSubmit(): void {
    const taskSubmitted = this.taskAddEditService.handleSubmittedData(
      this.formGroupEl
    );
    if (!taskSubmitted) {
      return;
    }

    this.appMonitoringService.setIsDataFetchingStatus(true);
    // Reset the tid to its original if we are in Edit mode
    if (this.task) {
      taskSubmitted.tid = this.task.tid;
    }

    this.logService.logToConsole(new Log("SUBMITTED", "INFO"));
    this.logService.logToConsole(new Log(this.formGroupEl.value));

    if (this.task) {
      // Handle the task editing process
      this.taskAddEditService.handleEditTask(this.userId, taskSubmitted, () =>
        this.dialogRef.close()
      );
    } else {
      // Handle the task adding process
      this.taskAddEditService.handleAddTask(this.userId, taskSubmitted, () =>
        this.dialogRef.close()
      );
    }
  }

  public onClickCancel(): void {
    this.dialogRef.close();
  }
}
