import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { Subscription } from "rxjs";

import { LogService } from "src/app/shared/services";
import { Log, User } from "src/app/shared/models";
import { DataFlowService } from "src/app/shared/services/data-flow/data-flow.service";
import { MatDialog } from "@angular/material/dialog";
import { TaskAddComponent } from "./task-add/task-add.component";
import { TASK_ADD_FORM_STYLE } from "src/configs";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public userData: User | null = null;

  private dataFlowServiceSubscription: Subscription = new Subscription();
  private databaseServiceSubscription: Subscription = new Subscription();

  constructor(
    private dataFlowService: DataFlowService,
    private logService: LogService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.dataFlowServiceSubscription = this.dataFlowService.userData.subscribe(
      (userData: User | null) => {
        this.userData = userData;
        this.logService.logToConsole(
          new Log("User Data loaded @Tasks", "INFO")
        );
        this.logService.logToConsole(new Log(userData));
      }
    );
  }

  public ngOnDestroy(): void {
    this.handleClosing();
  }

  public onClickAddTask(): void {
    this.dialog.open(
      TaskAddComponent,
      TASK_ADD_FORM_STYLE
    ).componentInstance.userId = this.userData.uid;
  }

  private handleClosing(): void {
    this.dataFlowServiceSubscription.unsubscribe();
    this.databaseServiceSubscription.unsubscribe();
  }
}
