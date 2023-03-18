import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { AppMonitoringService, UtilityService } from "src/app/shared/services";
import { LoginService } from "./login.service";
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
    public utilityService: UtilityService,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.loginService.initForm(this.userEmail);
    this.appMonitoringSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
  }

  public ngOnDestroy(): void {
    this.handleClosing();
  }

  public onClickSubmit(): void {
    const userCredentials = new UserLoginCredentials(
      this.formGroupEl.value["email"],
      this.formGroupEl.value["password"]
    );

    this.loginService.handleLogin(userCredentials, () => {
      this.dialogRef.close();
    });
  }

  public onClickCancel(): void {
    this.dialogRef.close();
  }

  public handleClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false); // Reset the isDataFetching variable in AppMonitoringService to false.
    this.appMonitoringSubscription.unsubscribe();
  }
}
