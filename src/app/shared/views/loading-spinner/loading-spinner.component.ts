import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AppMonitoringService } from "../../services/app-monitoring.service";
import { Subscription } from "rxjs";

/**
 * @class
 * @description - It acts as a loading spinner while the data is still getting fetched or loaded or uploaded.
 */
@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  @Input("message") message: string = "Please wait..."; // The message that will be shown below the spinner whiling loading/fetching data. This property can be set from outside the component.
  showSpinner: boolean = false; // It is used to control the visibility of the spinner.
  isDataFetchingSubs: Subscription = new Subscription(); // It is used to subscribe to the isDataFetchingSbj of the AppMonitoringService.

  /**
   * @constructor
   * @param appMonitoringService
   */
  constructor(private appMonitoringService: AppMonitoringService) {}

  /**
   * @method
   * @description - It initializes the component by subscribing and assigning the global dataFetching variable to the local showSpinner property.
   */
  ngOnInit(): void {
    // this.showSpinner = this.appMonitoringService.getIsDataFetchingStatus();
    // this.isDataFetchingSubs =
    //   this.appMonitoringService.isDataFetchingSbj.subscribe({
    //     next: (isDataFetching: boolean) => {
    //       this.showSpinner = isDataFetching;
    //     },
    //   });
  }

  /**
   * @method
   * @description - It performs necessary action when the component gets destroyed.
   */
  ngOnDestroy(): void {
    this.isDataFetchingSubs.unsubscribe();
  }
}
