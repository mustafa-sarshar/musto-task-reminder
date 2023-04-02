import { Injectable } from "@angular/core";

import { LogService } from "../log/log.service";
import { Log } from "../../models";

@Injectable({ providedIn: "root" })
export class CookieServiceService {
  constructor(private logService: LogService) {}

  public setCookie(
    cid: string,
    data: string,
    expiresIn: number,
    path: string = "/"
  ): void {
    // Retrieved from https://www.w3schools.com/js/js_cookies.asp (accessed on 22.03.2023)
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + expiresIn * 24 * 60 * 60 * 1000
    );
    const cookieObj = `musto-task-reminder__${cid}=${data}; expires=${expirationDate.toUTCString()}; path=${path}`;
    document.cookie = cookieObj;

    this.logService.logToConsole(new Log("COOKIE SET:", "INFO"));
    this.logService.logToConsole(new Log(cookieObj));
  }

  public deleteCookie(cid: string, path: string = "/"): void {
    // Retrieved from https://www.w3schools.com/js/js_cookies.asp (accessed on 22.03.2023)
    const cookieObj = `musto-task-reminder__${cid}=; expires=${new Date(
      "01-01-1000"
    ).toUTCString()}; path=${path}`;
    document.cookie = cookieObj;

    this.logService.logToConsole(new Log("COOKIE DELETED:", "WARN"));
    this.logService.logToConsole(new Log(cookieObj));
  }

  public getCookie(cid: string): string {
    // Retrieved from https://www.w3schools.com/js/js_cookies.asp (accessed on 22.03.2023)
    const cookieId = `musto-task-reminder__${cid}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieId) == 0) {
        return c.substring(cookieId.length, c.length);
      }
    }
    return "";
  }
}
