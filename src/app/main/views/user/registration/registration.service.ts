import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  AuthService,
  DatabaseService,
  LocalStorageService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import {
  AuthResponsePayload,
  Log,
  Notification,
  User,
  UserRegistrationCredentials,
} from "src/app/shared/models";

@Injectable()
export class RegistrationService implements OnInit, OnDestroy {
  private isDataFetching: boolean = false;
  private isDataFetchingSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private utilityService: UtilityService,
    private authService: AuthService,
    private logService: LogService,
    private localStorageService: LocalStorageService,
    private databaseService: DatabaseService
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
    this.isDataFetchingSubscription.unsubscribe();
  }

  public initForm(): FormGroup {
    const formGroupEl = new FormGroup({
      username: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(this.utilityService.getValidationMin("USERNAME")),
        Validators.maxLength(this.utilityService.getValidationMax("USERNAME")),
        Validators.pattern(
          this.utilityService.getValidationPattern("USERNAME")
        ),
      ]),
      email: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.email,
      ]),
      birthDate: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        this.utilityService.validateAge,
      ]),
      password: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(this.utilityService.getValidationMin("PASSWORD")),
        Validators.maxLength(this.utilityService.getValidationMax("PASSWORD")),
      ]),
    });
    return formGroupEl;
  }

  public handleRegistration(
    userCredentials: UserRegistrationCredentials,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.authService.handleUserRegistration(userCredentials).subscribe({
      next: (authResponse: AuthResponsePayload) => {
        // Init a user profile after a successful user registration via Email & Password
        const userProfileCredentials = new User(
          authResponse.localId,
          userCredentials.email,
          "",
          new Date(""),
          userCredentials.username,
          userCredentials.birthDate
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
                new Notification("REGISTRATION", "SUCCESS")
              );

              callbackSuccess(authResponse.email);
              this.appMonitoringService.setIsDataFetchingStatus(false);
            },
            error: (error: any) => {
              this.logService.logToConsole(
                new Log("Registration error:" + error.message, "ERROR")
              );
              this.logService.showNotification(
                new Notification("REGISTRATION", "ERROR")
              );

              // Delete the user account if the was an error while storing profile data on database
              this.authService
                .handleDeleteUserAccount(authResponse.idToken)
                .subscribe({
                  next: (_) => {
                    this.logService.logToConsole(
                      new Log("User account deleted successfully!", "INFO")
                    );
                    this.logService.showNotification(
                      new Notification("REGISTRATION", "WARN")
                    );

                    this.localStorageService.resetUserDataFromLocalStorage();
                    this.appMonitoringService.setIsDataFetchingStatus(false);
                  },
                  error: (error: any) => {
                    this.logService.logToConsole(
                      new Log("Deletion error:" + error.message, "ERROR")
                    );
                    this.logService.showNotification(
                      new Notification("REGISTRATION", "WARN")
                    );

                    this.localStorageService.resetUserDataFromLocalStorage();
                    this.appMonitoringService.setIsDataFetchingStatus(false);
                  },
                });
            },
          });
      },
      error: (error: any) => {
        this.logService.logToConsole(
          new Log("Registration error:" + error.message, "ERROR")
        );
        this.logService.showNotification(
          new Notification("REGISTRATION", "ERROR")
        );

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }
}
