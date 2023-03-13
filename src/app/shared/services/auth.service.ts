import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap } from "rxjs";

import { UtilityService } from "./utility.service";
import {
  LocalStorageService,
  UserDataFromLocalStorage,
} from "./local-storage.service";

import { User, UserRegistrationCredentials } from "../models/user.model";
import { environment } from "src/environments/environment.development";

export interface AuthUserCredentials {
  email: string;
  password: string;
}

export interface AuthResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService,
    private localStorageService: LocalStorageService
  ) {}

  public handleUserRegistration(
    userData: UserRegistrationCredentials
  ): Observable<AuthResponsePayload> {
    return this.http
      .post<AuthResponsePayload>(
        `${environment.authEndpointSignUp}?key=${environment.firebaseApiKey}`,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.utilityService.handleError),
        tap((resData: AuthResponsePayload) => {
          this.handleAuthentication(resData, false);
        })
      );
  }

  public activateUserAutoLogin(): void {
    const userData: UserDataFromLocalStorage =
      this.localStorageService.getUserDataFromLocalStorage();
    if (userData) {
      const userLoaded = new User(
        userData.id,
        userData.email,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (userLoaded.token) {
        const expirationDuration =
          this.utilityService.calculateExpirationDuration(
            userData._tokenExpirationDate
          );

        this.userData.next(userLoaded);
        this.activateUserAutoLogout(expirationDuration);
      }
    }
  }

  public handleUserLogin(
    userCredentials: AuthUserCredentials
  ): Observable<AuthResponsePayload> {
    return this.http
      .post<AuthResponsePayload>(
        `${environment.authEndpointSignIn}?key=${environment.firebaseApiKey}`,
        {
          email: userCredentials.email,
          password: userCredentials.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.utilityService.handleError),
        tap((resData) => {
          this.handleAuthentication(resData, true);
        })
      );
  }

  public handleUserLogout(): void {
    this.userData.next(null);
    this.router.navigate(["/welcome"]);
    this.localStorageService.resetUserDataFromLocalStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public activateUserAutoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.handleUserLogout();
    }, expirationDuration);
  }

  public handleDeleteUserAccount(userId: string): Observable<string> {
    return this.http
      .post<string>(
        `${environment.authEndpointDeleteUserAccount}?key=${environment.firebaseApiKey}`,
        {
          idToken: userId,
        }
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  private handleAuthentication(
    { localId, email, idToken, expiresIn },
    login: boolean = false
  ): void {
    const expirationDate = this.utilityService.calculateExpirationDate(
      +expiresIn
    );
    const userData = new User(localId, email, idToken, expirationDate);
    this.userData.next(userData);

    if (login) {
      this.activateUserAutoLogout(+expiresIn * 1000);
      this.localStorageService.storeUserDataOnLocalStorage(userData);
    }
  }
}
