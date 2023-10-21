import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

import { RegistrationComponent } from "../user/registration/registration.component";
import { LoginComponent } from "../user/login/login.component";

import { DataFlowService } from "src/app/shared/services";
import { LOGIN_SIGNUP_FORM_STYLE } from "src/configs";
import { LanguageCode } from "src/app/shared/models";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private appLanguageSubscription?: Subscription;

  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService,
    private dataFlowService: DataFlowService
  ) {}

  public ngOnInit(): void {
    this.dataFlowService.applyAppLanguage();

    this.appLanguageSubscription = this.dataFlowService.appLanguage.subscribe(
      (selectedLanguage: LanguageCode) => {
        this.translateService.use(selectedLanguage);
      }
    );
  }

  public ngOnDestroy(): void {
    this.appLanguageSubscription?.unsubscribe();
  }

  public onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, LOGIN_SIGNUP_FORM_STYLE);
  }

  public onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, LOGIN_SIGNUP_FORM_STYLE);
  }
}
