import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Log, Task, User } from "src/app/shared/models";
import {
  DataFlowService,
  LogService,
  UtilityService,
} from "src/app/shared/services";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit, OnDestroy {
  public userId: string | null = null;
  public tasks: Task[] | null = null;
  public formGroupEl: FormGroup;
  private dataFlowServiceSubscription: Subscription = new Subscription();

  constructor(
    private dataFlowService: DataFlowService,
    private logService: LogService,
    private utilityService: UtilityService
  ) {}

  public ngOnInit(): void {
    this.initForm();
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

  private initForm(): void {
    this.formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: "",
          disabled: this.tasks && this.tasks.length === 0,
        },
        [
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("TASK_TITLE")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_TITLE")
          ),
        ]
      ),
    });
  }

  public onClickClearSearchBox(): void {
    this.formGroupEl.setValue({ title: "" });
  }
}
