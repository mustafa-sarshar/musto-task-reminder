import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { Subscription } from "rxjs";

import { AuthService, LogService } from "src/app/shared/services";
import { Log, User } from "src/app/shared/models";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public userData: User | null = null;

  private authServiceSubscription: Subscription = new Subscription();
  private databaseServiceSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.userData.subscribe(
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
    this.authServiceSubscription.unsubscribe();
    this.databaseServiceSubscription.unsubscribe();
  }
}
