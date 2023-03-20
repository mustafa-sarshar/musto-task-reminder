import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Log, Task, User } from "src/app/shared/models";
import { DataFlowService, LogService } from "src/app/shared/services";
import { TasksListService } from "./tasks-list.service";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
  providers: [TasksListService],
})
export class TasksListComponent implements OnInit, OnDestroy {
  public userId: string | null = null;
  public tasks: Task[] | null = null;
  public formGroupEl: FormGroup;
  private dataFlowServiceSubscription: Subscription = new Subscription();

  constructor(
    private dataFlowService: DataFlowService,
    private logService: LogService,
    private tasksListService: TasksListService
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.tasksListService.initForm(this.tasks);
    this.dataFlowServiceSubscription = this.dataFlowService.userData.subscribe(
      (userData: User | null) => {
        this.logService.logToConsole(new Log("Tasks Loaded", "INFO"));
        this.logService.logToConsole(new Log(userData.tasks));

        if (userData.tasks) {
          this.tasks = [...userData.tasks];
          this.userId = userData.uid;
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this.dataFlowServiceSubscription.unsubscribe();
  }

  public onClickClearSearchBox(): void {
    this.formGroupEl.reset({ title: "" });
  }
}
