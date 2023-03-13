import { Component, OnDestroy, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

import { AuthService } from "../../services";

import { LanguageComponent } from "../language/language.component";

import { Language, User } from "../../models";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public isUserAuthenticated: boolean = false;
  public language: Language = "EN";
  private authServiceSubscription: Subscription = new Subscription();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.userData.subscribe(
      (userData: User) => {
        if (userData && userData.token) {
          this.isUserAuthenticated = true;
        } else {
          this.isUserAuthenticated = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

  onClickAppBrand(): void {
    this.router.navigate(["/tasks"]);
  }

  onClickUserProfile(): void {
    this.router.navigate(["/user-profile"]);
  }

  onClickLogout(): void {
    this.authService.handleUserLogout();
  }

  onClickLanguage(): void {
    this.dialog.open(LanguageComponent);
  }
}
