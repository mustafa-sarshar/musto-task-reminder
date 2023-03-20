import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

import { User, UserDataFromLocalStorage } from "../../models";
import { FormControl } from "@angular/forms";

type dateValidation = {
  validateDate: {
    valid: boolean;
  };
};

type ValidationFields =
  | "USERNAME"
  | "EMAIL"
  | "BIRTH_DATE"
  | "PASSWORD"
  | "TASK_TITLE"
  | "TASK_DESCRIPTION"
  | "TASK_DEADLINE"
  | "WEB_LINK";

@Injectable({ providedIn: "root" })
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

  public getValidationLengthMin(fieldName: ValidationFields): number {
    let fieldLength: number = 0;
    switch (fieldName) {
      case "USERNAME":
        fieldLength = 5;
        break;
      case "PASSWORD":
        fieldLength = 8;
        break;
      case "TASK_TITLE":
        fieldLength = 3;
        break;
      case "TASK_DESCRIPTION":
        fieldLength = 0;
        break;
      case "WEB_LINK":
        fieldLength = 10;
        break;
      default:
        break;
    }
    return fieldLength;
  }

  public getValidationLengthMax(fieldName: ValidationFields): number {
    let fieldLength: number = 0;
    switch (fieldName) {
      case "USERNAME":
        fieldLength = 10;
        break;
      case "PASSWORD":
        fieldLength = 256;
        break;
      case "TASK_TITLE":
        fieldLength = 20;
        break;
      case "TASK_DESCRIPTION":
        fieldLength = 256;
        break;
      case "WEB_LINK":
        fieldLength = 2048;
        break;
      default:
        break;
    }
    return fieldLength;
  }

  public getValidationPattern(fieldName: ValidationFields): string {
    let pattern: string = "";
    switch (fieldName) {
      case "USERNAME":
        pattern = "[a-zA-Z0-9-]+";
        break;
      case "PASSWORD":
        pattern =
          "(?=^.{8,}$)(?=.*d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";
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

  public getValidationMessage(fieldName: ValidationFields): string {
    let message: string = "";
    switch (fieldName) {
      case "USERNAME":
        message = "Username must be 5-10 characters long and alphanumeric!";
        break;
      case "EMAIL":
        message = "Email must be valid!";
        break;
      case "BIRTH_DATE":
        message = "Birth date must be valid!";
        break;
      case "PASSWORD":
        message =
          "Password length must be 8-256 characters long and/or contain one or more uppercase characters, and/or one or more lowercase characters, and/or one or more numeric values, and/or one or more special characters";
        break;
      case "TASK_TITLE":
        message =
          "Title must be 3-20 characters and start with an alphabet! Only parentheses and spaces are allowed!";
        break;
      case "TASK_DESCRIPTION":
        message =
          "Description must be 5-256 characters long and alphanumeric! Moreover, parentheses and spaces are allowed!";
        break;
      case "TASK_DEADLINE":
        message = "Deadline date must be valid!";
        break;
      case "WEB_LINK":
        message =
          "Please enter a valid link! (e.g. http://www... or https://www...)";
        break;
      default:
        break;
    }
    return message;
  }

  public validateDateMin(controlEl: FormControl): dateValidation | null {
    const dateNow = new Date().toISOString().slice(0, 10);
    return controlEl.value >= dateNow
      ? null
      : {
          validateDate: {
            valid: false,
          },
        };
  }

  public validateAge(dateInput: FormControl): dateValidation | null {
    const minAge = 3;
    const maxAge = 120;
    const dateNow = new Date();
    const dateInputTime = new Date(dateInput.value).getTime();
    const minAgeTime = new Date(
      dateNow.getFullYear() - minAge,
      dateNow.getMonth(),
      dateNow.getDate()
    ).getTime();
    const maxAgeTime = new Date(
      dateNow.getFullYear() - maxAge,
      dateNow.getMonth(),
      dateNow.getDate()
    ).getTime();

    return dateInputTime <= minAgeTime && dateInputTime >= maxAgeTime
      ? null
      : {
          validateDate: {
            valid: false,
          },
        };
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
