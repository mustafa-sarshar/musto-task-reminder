import { Injectable } from "@angular/core";
import { User } from "../models";

export interface UserDataFromLocalStorage {
  id: string;
  email: string;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

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
  }

  public resetUserDataFromLocalStorage(): void {
    localStorage.clear();
  }
}
