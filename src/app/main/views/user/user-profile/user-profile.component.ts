import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import {
  AppMonitoringService,
  LogService,
  DataFlowService,
  UtilityService,
} from "src/app/shared/services";
import { UserProfileService } from "./user-profile.service";

import { ConfirmationDialogBox, Log, User } from "src/app/shared/models";
import { CONFIRMATION_POPUP_STYLE } from "src/configs";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public formGroupEl: FormGroup;
  public userData: User | null = null;
  public isDataFetching: boolean = false;
  public hidePasswordValue: boolean = true;
  private appMonitoringServiceSubscription: Subscription = new Subscription();
  private dataFlowServiceSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private logService: LogService,
    private dataFlowService: DataFlowService,
    private userProfileService: UserProfileService,
    public utilityService: UtilityService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.formGroupEl = this.userProfileService.initForm();
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });

    this.dataFlowServiceSubscription = this.dataFlowService.userData.subscribe(
      (userData: User) => {
        this.userData = userData;
        this.logService.logToConsole(
          new Log("User Data loaded @Tasks", "INFO")
        );
        this.logService.logToConsole(new Log(userData));
        this.appMonitoringService.setIsDataFetchingStatus(false);
      }
    );
  }

  public ngOnDestroy(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.appMonitoringServiceSubscription.unsubscribe();
    this.dataFlowServiceSubscription.unsubscribe();
  }

  onClickDeleteAccount(): void {
    if (this.userData.username) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.confirmationDialogBox =
        new ConfirmationDialogBox(
          "Be careful!",
          "Do you really want to delete your account?",
          "YES/NO"
        );
      dialogRef.afterClosed().subscribe((answer) => {
        if (answer) {
          this.userProfileService.handleDeleteAccount(this.userData);
        }
      });
    }
  }

  public onClickReset(): void {
    this.formGroupEl.reset();
  }

  public onClickApplyChanges(): void {
    const dataToPatch = {};
    if (this.formGroupEl.controls["username"].value) {
      dataToPatch["username"] = this.formGroupEl.controls["username"].value;
    }
    if (this.formGroupEl.controls["birthDate"].value) {
      dataToPatch["birthDate"] = this.formGroupEl.controls["birthDate"].value;
    }
    this.userProfileService.handleApplyChanges(this.userData, dataToPatch, () =>
      this.formGroupEl.reset()
    );
  }
}
