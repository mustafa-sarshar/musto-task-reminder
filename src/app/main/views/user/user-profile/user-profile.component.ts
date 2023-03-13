import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { ConfirmationDialogBox, User } from "src/app/shared/models";
import {
  AppMonitoringService,
  AuthService,
  LocalStorageService,
} from "src/app/shared/services";
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
  private authServiceSubscription: Subscription = new Subscription();

  constructor(
    private appMonitoringService: AppMonitoringService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.appMonitoringService.setIsDataFetchingStatus(true);
    this.initForm();
    this.appMonitoringServiceSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });

    this.userData = this.authService.userData.getValue();
    console.log(this.userData);
    this.appMonitoringService.setIsDataFetchingStatus(false);
  }

  public ngOnDestroy(): void {
    this.onClosing();
  }

  private initForm(): void {
    this.formGroupEl = new FormGroup({
      username: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z0-9-]+"),
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

  onClickDeleteAccount(): void {
    if (this.userData.username) {
      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        CONFIRMATION_POPUP_STYLE
      );
      dialogRef.componentInstance.confirmationDialogBox =
        new ConfirmationDialogBox(
          "Be careful!",
          "Do you really want to delete your account?"
        );
      dialogRef.componentInstance.confirmationDialogType = "YES/NO";
      dialogRef.afterClosed().subscribe((answer) => {
        if (answer) {
          console.log("User ID", this.userData.id);
          this.authService.handleDeleteUserAccount(this.userData.id).subscribe({
            next: (_) => {
              this.snackBar.open("The account is deleted!", "OK", {
                duration: 2000,
                panelClass: ["green-snackbar"],
              });
              this.authService.handleUserLogout();
              this.appMonitoringService.setIsDataFetchingStatus(false);
            },
            error: (error: any) => {
              console.error("Deletion error:", error.message);
              this.snackBar.open(error.message, "OK", {
                duration: 2000,
                panelClass: ["red-snackbar"],
              });
              this.appMonitoringService.setIsDataFetchingStatus(false);
            },
          });
        }
      });
    }
  }

  public onSubmitForm(): void {}

  private onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false);
    this.appMonitoringServiceSubscription.unsubscribe();
  }
}
