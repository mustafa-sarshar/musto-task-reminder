import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor() {}

  calculateExpirationDate(expiresIn: number): Date {
    return new Date(new Date().getTime() + expiresIn * 1000);
  }

  calculateExpirationDuration(expirationDate: string): number {
    return new Date(expirationDate).getTime() - new Date().getTime();
  }

  handleError(errorRes: HttpErrorResponse) {
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
