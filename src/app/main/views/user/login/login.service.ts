import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  AuthService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import {
  AuthResponsePayload,
  Log,
  Notification,
  UserLoginCredentials,
} from "src/app/shared/models";

@Injectable()
export class LoginService implements OnInit, OnDestroy {
  private isDataFetching: boolean = false;
  private isDataFetchingSubscription?: Subscription;

  constructor(
    private appMonitoringService: AppMonitoringService,
    private utilityService: UtilityService,
    private authService: AuthService,
    private logService: LogService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.isDataFetchingSubscription =
      this.appMonitoringService.isDataFetching.subscribe(
        (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        }
      );
  }

  public ngOnDestroy(): void {
    this.isDataFetchingSubscription?.unsubscribe();
  }

  public initForm(userEmail: string): FormGroup {
    const formGroupEl = new FormGroup({
      email: new FormControl(
        {
          value: userEmail ? userEmail : "",
          disabled: this.isDataFetching,
        },
        [Validators.required, Validators.email]
      ),
      password: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(this.utilityService.getValidationMin("PASSWORD")),
        Validators.maxLength(this.utilityService.getValidationMax("PASSWORD")),
      ]),
    });
    return formGroupEl;
  }

  public handleLogin(
    userCredentials: UserLoginCredentials,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.authService.handleUserLogin(userCredentials).subscribe({
      next: (response: AuthResponsePayload) => {
        this.logService.logToConsole(new Log("Login was successful!", "INFO"));
        this.logService.logToConsole(new Log(response));
        this.logService.showNotification(new Notification("LOGIN", "SUCCESS"));

        this.authService.activateUserAutoLogout(+response.expiresIn * 1000);

        if (callbackSuccess) {
          callbackSuccess();
        }
        this.router.navigate(["/tasks"]);
      },
      error: (error: any) => {
        this.logService.logToConsole(
          new Log("Login Error: " + error.message, "ERROR")
        );
        this.logService.showNotification(new Notification("LOGIN", "ERROR"));

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }
}
