import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { RegistrationComponent } from "../user/registration/registration.component";
import { LoginComponent } from "../user/login/login.component";

import { LOGIN_SIGNUP_FORM_STYLE } from "src/configs";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent {
  constructor(private dialog: MatDialog) {}

  public onOpenUserLoginDialog(): void {
    this.dialog.open(LoginComponent, LOGIN_SIGNUP_FORM_STYLE);
  }

  public onOpenUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, LOGIN_SIGNUP_FORM_STYLE);
  }
}
