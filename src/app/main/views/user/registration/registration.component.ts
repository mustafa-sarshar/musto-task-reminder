import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  AuthService,
  DatabaseService,
  LocalStorageService,
  LogService,
  UtilityService,
} from "src/app/shared/services";

import { LoginComponent } from "../login/login.component";
import { LOGIN_SIGNUP_FORM_STYLE } from "src/configs";

import {
  AuthResponsePayload,
  Log,
  Notification,
  User,
  UserRegistrationCredentials,
} from "src/app/shared/models";
import { RegistrationService } from "./registration.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public formGroupEl: FormGroup;
  public isDataFetching: boolean = false;
  public hidePasswordValue: boolean = true;
  private appMonitoringSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private localStorageService: LocalStorageService,
    private logService: LogService,
    public utilityService: UtilityService,
    private registrationService: RegistrationService,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.registrationService.initForm();
    this.appMonitoringSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.handleClosing();
  }

  public onClickSubmit(): void {
    const userCredentials: UserRegistrationCredentials =
      new UserRegistrationCredentials(
        this.formGroupEl.value["username"],
        this.formGroupEl.value["email"],
        this.formGroupEl.value["birthDate"],
        this.formGroupEl.value["password"]
      );

    this.registrationService.handleRegistration(
      userCredentials,
      (userEmail: string) => {
        this.dialogRef.close();
        this.dialog.open(
          LoginComponent,
          LOGIN_SIGNUP_FORM_STYLE
        ).componentInstance.userEmail = userEmail;
      }
    );
  }

  public onClickCancel(): void {
    this.handleClosing();
  }

  private handleClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false); // Reset the isDataFetching variable in AppMonitoringService to false.
    this.appMonitoringSubscription.unsubscribe();
    this.dialogRef.close();
  }
}
