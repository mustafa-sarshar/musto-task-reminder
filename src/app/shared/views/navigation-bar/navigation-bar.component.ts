import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatDialog } from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { map, shareReplay } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

import { AuthService, DataFlowService } from "../../services";

import { LanguageComponent } from "../language/language.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

import { ConfirmationDialogBox, Language, User } from "../../models";
import { CONFIRMATION_POPUP_STYLE } from "src/configs";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @ViewChild("drawer") drawerEl: MatDrawer;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public isUserAuthenticated: boolean = false;
  public username: string = "";
  public language: Language = "EN";
  private dataFlowServiceSubscription: Subscription = new Subscription();

  constructor(
    private dataFlowService: DataFlowService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.dataFlowServiceSubscription = this.dataFlowService.userData.subscribe(
      (userData: User | null) => {
        if (userData && userData.token) {
          this.isUserAuthenticated = true;
          this.username = userData.username;
        } else {
          this.isUserAuthenticated = false;
          this.username = "";
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this.dataFlowServiceSubscription.unsubscribe();
  }

  public onClickAppBrand(): void {
    this.router.navigate(["/tasks"]);
  }

  public onClickTasks(): void {
    this.router.navigate(["/tasks"]);
    this.drawerEl.close();
  }

  public onClickUserProfile(): void {
    this.router.navigate(["/user-profile"]);
    this.drawerEl.close();
  }

  public onClickSyncData(): void {
    this.dataFlowService.syncUserData();
    this.drawerEl.close();
  }

  public onClickLogout(): void {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      CONFIRMATION_POPUP_STYLE
    );
    dialogRef.componentInstance.confirmationDialogBox =
      new ConfirmationDialogBox(
        "Really?!",
        "Are you sure you want to quit?",
        "YES/NO"
      );
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.authService.handleUserLogout();
        this.drawerEl.close();
      }
    });
  }

  public onClickLanguage(): void {
    this.dialog.open(LanguageComponent);
    this.drawerEl.close();
  }
}
