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
    const userData: string | null = localStorage.getItem(
      "musto-task-reminder__userData"
    );
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }

  public storeUserDataOnLocalStorage(userData: User): void {
    localStorage.setItem(
      "musto-task-reminder__userData",
      JSON.stringify(userData)
    );

    this.logService.logToConsole(new Log("User data in LS changed!", "INFO"));
    this.logService.logToConsole(new Log(userData));
  }

  public getAppLanguageFromLocalStorage(): LanguageCode {
    const appLanguage: LanguageCode = localStorage.getItem(
      "musto-task-reminder__appLanguage"
    ) as LanguageCode;

    if (appLanguage) {
      return appLanguage;
    } else {
      return "en-US";
    }
  }

  public storeAppLanguageOnLocalStorage(selectedLanguage: LanguageCode): void {
    localStorage.setItem("musto-task-reminder__appLanguage", selectedLanguage);

    this.logService.logToConsole(new Log("App language saved in LS", "INFO"));
    this.logService.logToConsole(new Log(selectedLanguage));
  }

  public resetUserDataFromLocalStorage(): void {
    localStorage.clear();

    this.logService.logToConsole(new Log("LocalStorage cleared!", "INFO"));
  }
}
