import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

import { environment } from "src/environments/environment";
import { Log, Notification } from "../../models";

@Injectable({ providedIn: "root" })
export class LogService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {}

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
    const appLanguage = this.translateService.currentLang;
    if (appLanguage === "en-US") {
      this.snackBar.open(notification.nid, notification.action, {
        duration: notification.duration,
        panelClass:
          notification.type === "ERROR"
            ? ["red-snackbar"]
            : notification.type === "SUCCESS"
            ? ["green-snackbar"]
            : ["orange-snackbar"],
      });
    }
  }
}
