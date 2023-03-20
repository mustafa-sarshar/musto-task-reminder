import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { environment } from "src/environments/environment";
import { Log, Notification } from "../../models";

@Injectable({ providedIn: "root" })
export class LogService {
  constructor(private snackBar: MatSnackBar) {}

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
    this.snackBar.open(notification.message, notification.action, {
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
