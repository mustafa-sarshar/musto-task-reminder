import { DialogRef } from "@angular/cdk/dialog";
import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Log } from "src/app/shared/models";
import { Task, TaskGroup } from "src/app/shared/models/task/task.model";
import {
  AppMonitoringService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import { TaskAddEditService } from "./task-add-edit.service";
import { userTasksGroups } from "src/assets/data";

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
  private appMonitoringSubscription: Subscription = new Subscription();
  public taskGroups: TaskGroup[] = userTasksGroups;

  constructor(
    private logService: LogService,
    private appMonitoringService: AppMonitoringService,
    public utilityService: UtilityService,
    private taskAddEditService: TaskAddEditService,
    private dialogRef: DialogRef<TaskAddEditComponent>
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.taskAddEditService.initForm(this.task);
    this.appMonitoringSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.appMonitoringSubscription.unsubscribe();
  }

  public onClickSubmit() {
    this.appMonitoringService.setIsDataFetchingStatus(true);
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
