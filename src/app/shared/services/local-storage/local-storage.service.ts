import { Injectable } from "@angular/core";

import { LogService } from "../log/log.service";
import {
  LanguageCode,
  Log,
  User,
  UserDataFromLocalStorage,
} from "../../models";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  constructor(private logService: LogService) {}

  public getUserDataFromLocalStorage(): UserDataFromLocalStorage | null {
    const userData: string = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(localStorage.getItem("userData"));
    } else {
      return null;
    }
  }

  public storeUserDataOnLocalStorage(userData: User): void {
    localStorage.setItem("userData", JSON.stringify(userData));

    this.logService.logToConsole(new Log("User data in LS changed!", "INFO"));
    this.logService.logToConsole(new Log(userData));
  }

  public resetUserDataFromLocalStorage(): void {
    localStorage.clear();

    this.logService.logToConsole(new Log("LocalStorage cleared!", "INFO"));
  }

  public getAppLanguageFromLocalStorage(): LanguageCode {
    const appLanguage: LanguageCode = localStorage.getItem(
      "appLanguage"
    ) as LanguageCode;

    if (appLanguage) {
      return appLanguage;
    } else {
      return "en-US";
    }
  }

  public storeAppLanguageOnLocalStorage(selectedLanguage: LanguageCode): void {
    localStorage.setItem("appLanguage", selectedLanguage);

    this.logService.logToConsole(new Log("App language saved in LS", "INFO"));
    this.logService.logToConsole(new Log(selectedLanguage));
  }
}
