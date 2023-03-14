import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { Subscription } from "rxjs";

import { LogService } from "src/app/shared/services";
import { Log, User } from "src/app/shared/models";
import { DataFlowService } from "src/app/shared/services/data-flow/data-flow.service";

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
    private logService: LogService
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.dataFlowServiceSubscription.unsubscribe();
    this.databaseServiceSubscription.unsubscribe();
  }
}
