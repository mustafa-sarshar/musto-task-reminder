import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";

import {
  AppMonitoringService,
  LogService,
  DataFlowService,
  UtilityService,
} from "src/app/shared/services";
import { ProfileService } from "./profile.service";
import { onCanDeactivate } from "src/app/shared/guards";

import {
  ConfirmationDialogBox,
  LanguageCode,
  Log,
  User,
} from "src/app/shared/models";
import { CONFIRMATION_POPUP_STYLE } from "src/configs";
import { UrlTree } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit, OnDestroy, onCanDeactivate {
  @ViewChild("btnApplyChanges") btnApplyChangesEl: HTMLButtonElement;
  public formGroupEl: FormGroup;
  public userData: User | null = null;
  public isDataFetching: boolean = false;
  public hidePasswordValue: boolean = true;
  private isDataFetchingSubscription: Subscription = new Subscription();
  private appLanguageSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private logService: LogService,
    private dataFlowService: DataFlowService,
    private profileService: ProfileService,
    public utilityService: UtilityService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.dataFlowService.applyAppLanguage();

    this.appLanguageSubscription = this.dataFlowService.appLanguage.subscribe(
      (selectedLanguage: LanguageCode) => {
        this.translateService.use(selectedLanguage);
      }
    );

    this.formGroupEl = this.profileService.initForm();
    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });

    this.appLanguageSubscription = this.dataFlowService.userData.subscribe(
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
    this.isDataFetchingSubscription.unsubscribe();
    this.appLanguageSubscription.unsubscribe();
  }

  public onCanDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (
      this.profileService.stillEnteringForm(this.formGroupEl) ||
      this.isDataFetching
    ) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.confirmationDialogBox =
        new ConfirmationDialogBox("LEAVE_PAGE", "OK/CANCEL");
      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

  public onClickDeleteAccount(): void {
    if (this.userData.username) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.confirmationDialogBox =
        new ConfirmationDialogBox("DELETE_ACCOUNT", "YES/NO");
      dialogRef.afterClosed().subscribe((answer) => {
        if (answer) {
          this.profileService.handleDeleteAccount(this.userData);
        }
      });
    }
  }

  public onClickReset(): void {
    this.formGroupEl.reset({ username: "", birthDate: "" });
  }

  public onClickApplyChanges(): void {
    const dataToPatch = {};
    if (this.formGroupEl.controls["username"].value) {
      dataToPatch["username"] = this.formGroupEl.controls["username"].value;
    }
    if (this.formGroupEl.controls["birthDate"].value) {
      dataToPatch["birthDate"] = this.formGroupEl.controls["birthDate"].value;
    }
    this.profileService.handleApplyChanges(this.userData, dataToPatch, () =>
      this.formGroupEl.reset({ username: "", birthDate: "" })
    );
  }
}
