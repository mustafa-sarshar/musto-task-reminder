import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

import { User, UserDataFromLocalStorage } from "../../models";

type ValidationPatterns =
  | "USERNAME"
  | "TASK_TITLE"
  | "TASK_DESCRIPTION"
  | "WEB_LINK";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor() {}

  public calculateExpirationDate(expiresIn: number): Date {
    return new Date(new Date().getTime() + expiresIn * 1000);
  }

  public calculateExpirationDuration(expirationDate: string): number {
    return new Date(expirationDate).getTime() - new Date().getTime();
  }

  public convertUserDataFormat(userData: UserDataFromLocalStorage): User {
    const userDataLoaded = new User(
      userData.uid,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.username,
      new Date(userData.birthDate),
      userData.tasks
    );
    return userDataLoaded;
  }

  private generateId(
    length: number,
    targetList: string[],
    sep: string = ""
  ): string {
    let randomId: string[] = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * targetList.length);
      randomId.push(targetList[randomIndex]);
    }

    return randomId.join(sep);
  }

  public randomIdGenerator(
    length: number,
    idType: "NUMBER" | "CHARACTER" | "MIXED",
    sep?: string
  ): string {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let randomId = "";

    switch (idType) {
      case "NUMBER":
        randomId = this.generateId(length, numbers, sep);
        break;
      case "CHARACTER":
        randomId = this.generateId(length, alphabets, sep);
        break;
      case "MIXED":
        randomId = this.generateId(length, [...alphabets, ...numbers], sep);
        break;
      default:
        break;
    }
    return randomId;
  }

  public getValidationPattern(patternName: ValidationPatterns): string {
    let pattern = "";
    switch (patternName) {
      case "USERNAME":
        pattern = "";
        break;
      case "TASK_TITLE":
        pattern = "^[a-zA-Z]*[a-zA-Z][-a-zA-Z0-9,/() ]*$";
        break;
      case "TASK_DESCRIPTION":
        pattern = "^[a-zA-Z0-9]*[a-zA-Z0-9][-a-zA-Z0-9,/() ]*$";
        break;
      case "WEB_LINK":
        pattern =
          "[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?";
        break;
      default:
        break;
    }
    return pattern;
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error ocurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exists!";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid!";
        break;
      case "USER_DISABLED":
        errorMessage =
          "The user account has been disabled by an administrator!";
        break;
      case "INVALID_ID_TOKEN":
        errorMessage = "The user's credential is no longer valid.";
        break;
      case "USER_NOT_FOUND":
        errorMessage =
          "There is no user record corresponding to this identifier.";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
