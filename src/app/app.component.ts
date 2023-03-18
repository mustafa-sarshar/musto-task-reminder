import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AuthService } from "./shared/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = "Musto Task Reminder";
  public timerRef: any = null;

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle($localize`${this.title}`);
  }

  public ngOnInit(): void {
    this.authService.activateUserAutoLogin();
  }

  public ngOnDestroy(): void {}
}
