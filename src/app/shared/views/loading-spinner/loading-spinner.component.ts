import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AppMonitoringService } from "../../services";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  public showSpinner: boolean = false; // It is used to control the visibility of the spinner.
  public isDataFetchingSubscription: Subscription = new Subscription(); // It is used to subscribe to the isDataFetchingSbj of the AppMonitoringService.

  constructor(private appMonitoringService: AppMonitoringService) {}

  public ngOnInit(): void {
    this.showSpinner = this.appMonitoringService.getIsDataFetchingStatus();
    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe({
        next: (isDataFetching: boolean) => {
          this.showSpinner = isDataFetching;
        },
      });
  }

  public ngOnDestroy(): void {
    this.isDataFetchingSubscription.unsubscribe();
  }
}
