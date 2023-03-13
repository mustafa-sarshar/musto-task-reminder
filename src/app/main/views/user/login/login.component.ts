import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

import { AppMonitoringService, AuthService } from "src/app/shared/services";
import { AuthResponsePayload } from "src/app/shared/services/auth.service";
import { UtilityService } from "src/app/shared/services/utility.service";

import { UserLoginCredentials } from "src/app/shared/models";

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
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
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

  // get formControls() {
  //   return (this.formGroupEl.get("hobbies") as FormArray).controls;
  // }

  public onSubmitForm(): void {
    const userData = new UserLoginCredentials(
      this.formGroupEl.value["email"],
      this.formGroupEl.value["password"]
    );

    this.authService.handleUserLogin(userData).subscribe({
      next: (response: AuthResponsePayload) => {
        this.snackBar.open("Login was successful!", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"],
        });

        this.authService.activateUserAutoLogout(+response.expiresIn * 1000);
        this.dialogRef.close();
        this.router.navigate(["/tasks"]);
      },
      error: (error: any) => {
        console.error("Login error:", error.message);
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
