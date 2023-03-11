import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { UserRegistrationCredentials } from "src/app/shared/models";
import { AppMonitoringService, AuthService } from "src/app/shared/services";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public isDataFetching: boolean = false;
  private appMonitoringSubscription: Subscription = new Subscription();
  public hidePasswordValue: boolean = true;
  public formGroupEl: FormGroup;

  constructor(
    private appMonitoringService: AppMonitoringService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegistrationComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.appMonitoringSubscription =
      this.appMonitoringService.isDataFetching.subscribe((status: boolean) => {
        this.isDataFetching = status;
      });
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
      email: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.email,
      ]),
      birthDate: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
      ]),
      password: new FormControl({ value: "", disabled: this.isDataFetching }, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public onSubmitForm(): void {
    const userData = new UserRegistrationCredentials(
      this.formGroupEl.value["username"],
      this.formGroupEl.value["email"],
      this.formGroupEl.value["birthDate"],
      this.formGroupEl.value["password"]
    );
    this.authService.registerUser(userData);
  }

  public onClickCancel(): void {
    this.onClosing();
  }

  private onClosing(): void {
    this.appMonitoringService.setIsDataFetchingStatus(false); // Reset the isDataFetching variable in AppMonitoringService to false.
    this.appMonitoringSubscription.unsubscribe();
    this.dialogRef.close();
  }
}
