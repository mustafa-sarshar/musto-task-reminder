import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

import { environment } from "src/environments/environment";
import { Log, Notification } from "../../models";

@Injectable({ providedIn: "root" })
export class LogService implements OnInit, OnDestroy {
  private notificationsSubscription: Subscription = new Subscription();

  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.notificationsSubscription.unsubscribe();
  }

  public logToConsole(log: Log): void {
    if (!environment.production) {
      switch (log.type) {
        case "INFO":
          console.log("INFO ----------");
          console.log(log.message);
          break;
        case "ERROR":
          console.log("ERROR ----------");
          console.error(log.message);
          break;
        case "WARN":
          console.log("WARN ----------");
          console.warn(log.message);
          break;
        default:
          console.log(log.message);
          break;
      }
    }
  }

  public showNotification(notification: Notification): void {
    const translateObjId = notification.nid.toLowerCase();
    const translateObjType = notification.type.toLowerCase();

    this.notificationsSubscription = this.translateService
      .get(`NOTIFICATIONS.${translateObjId}.${translateObjType}`)
      .subscribe({
        next: (data) => {
          if (data) {
            this.snackBar.open(data, notification.action, {
              duration: notification.duration,
              panelClass:
                notification.type === "ERROR"
                  ? ["red-snackbar"]
                  : notification.type === "SUCCESS"
                  ? ["green-snackbar"]
                  : ["orange-snackbar"],
            });
          }
        },
        error: (error) => {
          this.logToConsole(
            new Log("Notifications could not retrieved!", "ERROR")
          );
          this.logToConsole(new Log(error.message));
        },
      });
  }
}
