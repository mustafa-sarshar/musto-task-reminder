import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AuthService } from "./shared/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string = "Musto Task Reminder";

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle($localize`${this.title}`);
  }

  ngOnInit(): void {
    this.authService.activateUserAutoLogin();
  }
}
