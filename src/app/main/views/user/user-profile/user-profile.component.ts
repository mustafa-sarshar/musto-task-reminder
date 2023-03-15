import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import {
  ConfirmationDialogBox,
  Log,
  Notification,
  User,
  UserDataFromDatabase,
} from "src/app/shared/models";
import {
  AppMonitoringService,
  AuthService,
  DatabaseService,
  LogService,
} from "src/app/shared/services";
import { DataFlowService } from "src/app/shared/services/data-flow/data-flow.service";
import { ConfirmationDialogComponent } from "src/app/shared/views/confirmation-dialog/confirmation-dialog.component";
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
    private databaseService: DatabaseService,
    private authService: AuthService,
    private logService: LogService,
    private dataFlowService: DataFlowService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.initForm();
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
      }
    );
    this.appMonitoringService.setIsDataFetchingStatus(false);
  }

  public ngOnDestroy(): void {
    this.onClosing();
  }

  private initForm(): void {
    this.formGroupEl = new FormGroup({
      username: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z0-9-]+"),
      ]),
      birthDate: new FormControl(
        { value: "", disabled: this.isDataFetching },
        []
      ),
    });
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
          this.authService
            .handleDeleteUserAccount(this.userData.token)
            .subscribe({
              next: (_) => {
                this.logService.logToConsole(
                  new Log("The account is deleted successfully!", "INFO")
                );

                this.databaseService
                  .deleteUserProfileFromDatabase(this.userData.uid)
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
      });
    }
  }

  public onClickReset(): void {
    this.resetForm();
  }

  public onClickSubmit(): void {
    const dataToPatch = {};
    if (this.formGroupEl.controls["username"].value) {
      dataToPatch["username"] = this.formGroupEl.controls["username"].value;
    }
    if (this.formGroupEl.controls["birthDate"].value) {
      dataToPatch["birthDate"] = this.formGroupEl.controls["birthDate"].value;
    }
    this.databaseService
      .updateUserProfileDataInDatabase(this.userData.uid, dataToPatch)
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
            .getUserProfileDataFromDatabase(this.userData.uid)
            .subscribe({
              next: (response: UserDataFromDatabase) => {
                const userData = this.dataFlowService.getUserData();
                userData.username = response.username;
                userData.birthDate = new Date(response.birthDate);
                this.dataFlowService.setUserData(userData);
                this.resetForm();

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

  private resetForm(): void {
    this.formGroupEl.reset();
  }

  private onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.appMonitoringServiceSubscription.unsubscribe();
    this.dataFlowServiceSubscription.unsubscribe();
  }
}
