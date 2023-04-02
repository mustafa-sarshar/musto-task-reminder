import { Component, OnDestroy, OnInit } from "@angular/core";

import { AuthService, DataFlowService } from "./shared/services";
import { TranslateService } from "@ngx-translate/core";
import { LanguageCode } from "./shared/models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  public defaultAppLanguage: LanguageCode = "en-US";

  constructor(
    private authService: AuthService,
    private dataFlowService: DataFlowService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    // Init the active user if the user was logged in before
    this.authService.activateUserAutoLogin();

    // Init the current app language
    this.translateService.addLangs(["en-US", "de-DE", "tr-TR", "fa-IR"]);
    this.translateService.setDefaultLang(this.defaultAppLanguage);
    this.dataFlowService.initAppLanguage();
  }

  public ngOnDestroy(): void {
    this.authService.handleUserLogout();
  }
}
