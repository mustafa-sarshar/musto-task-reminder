import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import {
  AppMonitoringService,
  AuthService,
  DataFlowService,
  DatabaseService,
  LogService,
  UtilityService,
} from "src/app/shared/services";
import {
  Log,
  Notification,
  User,
  UserDataFromDatabase,
} from "src/app/shared/models";

@Injectable({
  providedIn: "root",
})
export class UserProfileService implements OnInit, OnDestroy {
  private isDataFetching: boolean = false;
  private appMonitoringServiceSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private utilityService: UtilityService,
    private authService: AuthService,
    private logService: LogService,
    private databaseService: DatabaseService,
    private dataFlowService: DataFlowService
  ) {}

  public ngOnInit(): void {
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetching.subscribe(
        (isDataFetching: boolean) => {
          this.isDataFetching = isDataFetching;
        }
      );
  }

  public ngOnDestroy(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.appMonitoringServiceSubscription.unsubscribe();
  }

  public initForm(): FormGroup {
    const formGroupEl = new FormGroup({
      username: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.minLength(
          this.utilityService.getValidationLengthMin("USERNAME")
        ),
        Validators.maxLength(
          this.utilityService.getValidationLengthMax("USERNAME")
        ),
        Validators.pattern(
          this.utilityService.getValidationPattern("USERNAME")
        ),
      ]),
      birthDate: new FormControl({ value: "", disabled: this.isDataFetching }, [
        this.utilityService.validateAge,
      ]),
    });
    return formGroupEl;
  }

  public handleDeleteAccount(
    userData: User,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.authService.handleDeleteUserAccount(userData.token).subscribe({
      next: (_) => {
        this.logService.logToConsole(
          new Log("The account is deleted successfully!", "INFO")
        );

        this.databaseService
          .deleteUserProfileFromDatabase(userData.uid)
          .subscribe({
            next: (_) => {
              this.logService.logToConsole(
                new Log("User profile is deleted successfully!", "INFO")
              );
              this.logService.showNotification(
                new Notification(
                  "The account is deleted successfully!",
                  "SUCCESS"
                )
              );

              this.authService.handleUserLogout();
              this.appMonitoringService.setIsDataFetchingStatus(false);
            },
            error: (error: any) => {
              this.logService.logToConsole(
                new Log("User profile could not be deleted!", "ERROR")
              );
              this.logService.showNotification(
                new Notification(error.message, "ERROR")
              );

              this.authService.handleUserLogout();
              this.appMonitoringService.setIsDataFetchingStatus(false);
            },
          });
      },
      error: (error: any) => {
        this.logService.logToConsole(
          new Log("Deletion error:" + error.message, "ERROR")
        );
        this.logService.showNotification(
          new Notification(error.message, "ERROR")
        );

        this.appMonitoringService.setIsDataFetchingStatus(false);
      },
    });
  }

  public handleApplyChanges(
    userData: User,
    dataToPatch: any,
    callbackSuccess?: Function,
    callbackError?: Function
  ): void {
    this.databaseService
      .updateUserProfileDataInDatabase(userData.uid, dataToPatch)
      .subscribe({
        next: (response) => {
          this.logService.logToConsole(
            new Log("User profile is updated successfully!", "INFO")
          );
          this.logService.logToConsole(new Log(response));
          this.logService.showNotification(
            new Notification("User profile is updated successfully!", "SUCCESS")
          );

          this.databaseService
            .getUserProfileDataFromDatabase(userData.uid)
            .subscribe({
              next: (response: UserDataFromDatabase) => {
                const userData = this.dataFlowService.getUserData();
                userData.username = response.username;
                userData.birthDate = new Date(response.birthDate);
                this.dataFlowService.setUserData(userData);
                callbackSuccess();

                this.logService.logToConsole(
                  new Log("User data synced successfully!", "INFO")
                );
                this.logService.logToConsole(new Log(userData));
                this.logService.showNotification(
                  new Notification(
                    "User profile is updated successfully!",
                    "SUCCESS"
                  )
                );
              },
              error: (error: any) => {
                this.logService.logToConsole(
                  new Log(
                    "Update data could not get retrieved!" + error.message,
                    "ERROR"
                  )
                );
                this.logService.showNotification(
                  new Notification(error.message, "ERROR")
                );

                this.appMonitoringService.setIsDataFetchingStatus(false);
              },
            });

          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
        error: (error: any) => {
          this.logService.logToConsole(
            new Log(
              "User profile could not be updated!" + error.message,
              "ERROR"
            )
          );
          this.logService.showNotification(
            new Notification(error.message, "ERROR")
          );

          this.appMonitoringService.setIsDataFetchingStatus(false);
        },
      });
  }
}
