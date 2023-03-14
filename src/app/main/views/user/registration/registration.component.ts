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
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.appMonitoringSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.handleClosing();
  }

  private initForm(): void {
    this.formGroupEl = new FormGroup({
      username: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z0-9-]+"),
      ]),
      email: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.email,
      ]),
      birthDate: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
      ]),
      password: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  public onClickSubmit(): void {
    const userData = new UserRegistrationCredentials(
      this.formGroupEl.value["username"],
      this.formGroupEl.value["email"],
      this.formGroupEl.value["birthDate"],
      this.formGroupEl.value["password"]
    );

    this.authService.handleUserRegistration(userData).subscribe({
      next: (authResponse: AuthResponsePayload) => {
        // Init a user profile after a successful user registration via Email & Password
        const userProfileCredentials = new User(
          authResponse.localId,
          this.formGroupEl.value["email"],
          "",
          new Date(""),
          this.formGroupEl.value["username"],
          new Date(this.formGroupEl.value["birthDate"])
        );

        this.databaseService
          .setUserProfileInDatabase(userProfileCredentials)
          .subscribe({
            next: (_) => {
              this.logService.logToConsole(
                new Log("User registered successfully", "INFO")
              );
              this.logService.logToConsole(new Log(userProfileCredentials));
              this.logService.showNotification(
                new Notification("Registration was successful!", "SUCCESS")
              );

              this.dialogRef.close();
              this.dialog.open(
                LoginComponent,
                LOGIN_SIGNUP_FORM_STYLE
              ).componentInstance.userEmail = authResponse.email;
            },
            error: (error: any) => {
              this.logService.logToConsole(
                new Log("Registration error:" + error.message, "ERROR")
              );
              this.logService.showNotification(
                new Notification(error.message, "ERROR")
              );

              // Delete the user account if the was an error while storing user-profile data on database
              this.authService
                .handleDeleteUserAccount(authResponse.idToken)
                .subscribe({
                  next: (_) => {
                    this.logService.logToConsole(
                      new Log("User account deleted successfully!", "INFO")
                    );
                    this.logService.showNotification(
                      new Notification("Please try again!", "WARN")
                    );

                    this.localStorageService.resetUserDataFromLocalStorage();
                    this.appMonitoringService.setIsDataFetchingStatus(false);
                  },
                  error: (error: any) => {
                    this.logService.logToConsole(
                      new Log("Deletion error:" + error.message, "ERROR")
                    );
                    this.logService.showNotification(
                      new Notification(error.message, "ERROR")
                    );

                    this.localStorageService.resetUserDataFromLocalStorage();
                    this.appMonitoringService.setIsDataFetchingStatus(false);
                  },
                });
            },
          });
      },
      error: (error: any) => {
        console.error("Registration error:", error.message);
        this.snackBar.open(error.message, "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"],
        });

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
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
