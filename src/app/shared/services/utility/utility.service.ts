import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { throwError } from "rxjs";

import { User, UserDataFromLocalStorage } from "../../models";

type dateValidation = {
  validateDate: {
    valid: boolean;
  };
};

type timeParsedLong = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type timeParsedShort = {
  hours: number;
  minutes: number;
  seconds: number;
};

type dateTimeParsed = {
  date: string;
  time: string;
};

type ValidationFields =
  | "USERNAME"
  | "EMAIL"
  | "BIRTH_DATE"
  | "PASSWORD"
  | "TASK_TITLE"
  | "TASK_DESCRIPTION"
  | "TASK_DEADLINE"
  | "WEB_LINK"
  | "NUMBER"
  | "TIME"
  | "TIME_DAY"
  | "TIME_HOUR"
  | "TIME_MINUTE";

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
      new Date(userData.birthDate ? userData.birthDate : new Date(0)),
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

  public getRandomId(
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

  public getValidationMin(fieldName: ValidationFields): number {
    let minValue: number = 0;
    switch (fieldName) {
      case "USERNAME":
        minValue = 5;
        break;
      case "PASSWORD":
        minValue = 8;
        break;
      case "TASK_TITLE":
        minValue = 3;
        break;
      case "TASK_DESCRIPTION":
        minValue = 0;
        break;
      case "WEB_LINK":
        minValue = 10;
        break;
      case "TIME_DAY":
        minValue = 0;
        break;
      case "TIME_HOUR":
        minValue = 0;
        break;
      case "TIME_MINUTE":
        minValue = 0;
        break;
      default:
        break;
    }
    return minValue;
  }

  public getValidationMax(fieldName: ValidationFields): number {
    let maxValue: number = 0;
    switch (fieldName) {
      case "USERNAME":
        maxValue = 20;
        break;
      case "PASSWORD":
        maxValue = 256;
        break;
      case "TASK_TITLE":
        maxValue = 20;
        break;
      case "TASK_DESCRIPTION":
        maxValue = 256;
        break;
      case "WEB_LINK":
        maxValue = 2048;
        break;
      case "TIME_DAY":
        maxValue = -1;
        break;
      case "TIME_HOUR":
        maxValue = 23;
        break;
      case "TIME_MINUTE":
        maxValue = 59;
        break;
      default:
        break;
    }
    return maxValue;
  }

  public getValidationPattern(fieldName: ValidationFields): RegExp {
    let pattern: RegExp = /\w\d/gi;
    switch (fieldName) {
      case "USERNAME":
        // source: https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
        pattern =
          /^(?=.{5,20}$)(?![_.0-9])(?!.*[_.]{2})[a-z0-9öäüß._ ]+(?<![_.])$/i;
        break;
      case "PASSWORD":
        pattern =
          /(?=^.{8,256}$)(?=.*d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        break;
      case "TASK_TITLE":
        pattern = /^[a-zöäüß]*[a-zöäüß][-a-zöäüß0-9,/() ]*$/i;
        break;
      case "TASK_DESCRIPTION":
        pattern = /^[a-zöäüß0-9]*[a-zöäüß0-9][-a-zöäüß0-9,/() ]*$/i;
        break;
      case "WEB_LINK":
        // source: https://snyk.io/blog/secure-javascript-url-validation/
        pattern =
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
        break;
      case "NUMBER":
        pattern = /^[0-9]d*$/;
        break;
      case "TIME":
        pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        break;
      default:
        break;
    }
    return pattern;
  }

  public validateDeadlineDate(controlEl: FormControl): dateValidation | null {
    const dateNow: string = new Date().toISOString().slice(0, 10);
    return controlEl.value >= dateNow
      ? null
      : {
          validateDate: {
            valid: false,
          },
        };
  }

  public validateDeadline(deadline: Date): boolean {
    return deadline.getTime() > new Date().getTime() + 5 + 60 + 1000;
  }

  public validateAge(dateInput: FormControl<Date>): dateValidation | null {
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

  public subtractTimeFromDate(
    deadline: Date,
    days: number = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
  ): Date {
    const dateTimeRemained =
      deadline.getTime() -
      days * 24 * 60 * 60 * 1000 -
      hours * 60 * 60 * 1000 -
      minutes * 60 * 1000 -
      seconds * 1000;

    return new Date(dateTimeRemained);
  }

  public validateReminder(deadline: Date, reminder: Date): boolean {
    const dateNow = new Date();
    console.log("validateReminder");
    console.log(dateNow);
    console.log(deadline);
    console.log(reminder);

    if (
      deadline.getTime() - reminder.getTime() - dateNow.getTime() &&
      reminder.getTime() !== deadline.getTime()
    ) {
      return true;
    } else {
      return false;
    }
  }

  public convertTimeStringToNumber(time: string): number {
    const timeArray = time.split(":");

    let timeNumber =
      parseInt(timeArray[0], 10) * 60 * 60 + parseInt(timeArray[1], 10) * 60;
    if (timeArray.length === 3) {
      timeNumber += parseInt(timeArray[2], 10);
    }

    return timeNumber;
  }

  public extractTimeElementsFromTimeString(time: string): timeParsedShort {
    const timeArray = time.split(":");
    return {
      hours: +timeArray[0],
      minutes: +timeArray[1],
      seconds: timeArray.length > 2 ? +timeArray[2] : 0,
    };
  }

  public parseDateToDateTimeStringObject(date: Date): dateTimeParsed {
    return {
      date: date.toISOString().slice(0, 10),
      time: `${("0" + date.getHours()).slice(-2)}:${(
        "0" + date.getMinutes()
      ).slice(-2)}`,
    };
  }

  public setTimeForDate(date: string, time: string): Date {
    const datePart = new Date(Date.parse(date) + 1000 * 60 * 60);
    const timePart = this.extractTimeElementsFromTimeString(time);

    datePart.setHours(timePart.hours);
    datePart.setMinutes(timePart.minutes);
    datePart.setSeconds(timePart.seconds);

    return new Date(datePart);
  }

  public getTimeReminder(reminder: Date, deadline: Date): timeParsedLong {
    const total = deadline.getTime() - reminder.getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    console.log("\n\n\n");
    console.log(total, days, hours, minutes, seconds);
    console.log("\n\n\n");

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  public getTimeLeft(endTime: Date, startTime?: Date): timeParsedLong {
    let sTime = new Date().getTime();
    if (startTime) {
      sTime = startTime.getTime();
    }
    const total = new Date(endTime).getTime() - sTime;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
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
