import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppMonitoringService {
  public isDataFetching: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  public getIsDataFetchingStatus(): boolean {
    return this.isDataFetching.getValue();
  }

  public setIsDataFetchingStatus(status: boolean): void {
    this.isDataFetching.next(status);
  }
}
