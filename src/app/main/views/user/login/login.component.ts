import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  AuthService,
  LogService,
} from "src/app/shared/services";
import {
  AuthResponsePayload,
  Log,
  Notification,
  UserLoginCredentials,
} from "src/app/shared/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public isDataFetching: boolean = false;
  private appMonitoringSubscription: Subscription = new Subscription();
  public hidePasswordValue: boolean = true;
  public formGroupEl: FormGroup;
  public userEmail: string = "";

  constructor(
    private appMonitoringService: AppMonitoringService,
    private authService: AuthService,
    private logService: LogService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
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
      email: new FormControl(
        {
          value: this.userEmail ? this.userEmail : "",
          disabled: this.isDataFetching,
        },
        [Validators.required, Validators.email]
      ),
      password: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  public onClickSubmit(): void {
    const userData = new UserLoginCredentials(
      this.formGroupEl.value["email"],
      this.formGroupEl.value["password"]
    );

    this.authService.handleUserLogin(userData).subscribe({
      next: (response: AuthResponsePayload) => {
        this.logService.logToConsole(new Log("Login was successful!", "INFO"));
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(
          new Notification("Login was successful!", "SUCCESS")
        );

        this.authService.activateUserAutoLogout(+response.expiresIn * 1000);
        this.dialogRef.close();
        this.router.navigate(["/tasks"]);
      },
      error: (error: any) => {
        this.logService.logToConsole(
          new Log("Login Error: " + error.message, "ERROR")
        );
        this.logService.showNotification(
          new Notification(error.message, "ERROR")
        );

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
