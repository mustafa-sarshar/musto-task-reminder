import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap } from "rxjs";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { DatabaseService } from "../database/database.service";
import { UtilityService } from "../utility/utility.service";

import { environment } from "src/environments/environment.development";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  AuthResponsePayload,
  AuthUserCredentials,
  Log,
  User,
  UserDataFromDatabase,
  UserDataFromLocalStorage,
  UserRegistrationCredentials,
} from "../../models";
import { LogService } from "../log/log.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer = null;

  constructor(
    private localStorageService: LocalStorageService,
    private databaseService: DatabaseService,
    private utilityService: UtilityService,
    private logService: LogService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public setUserData(userData: User | null) {
    this.userData.next(userData);
  }

  public getUserData(): User | null {
    const userData: UserDataFromLocalStorage =
      this.localStorageService.getUserDataFromLocalStorage();
    if (userData) {
      return this.utilityService.convertUserDataFormat(userData);
    } else {
      return null;
    }
  }

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

  public activateUserAutoLogin(): void {
    const userData: UserDataFromLocalStorage =
      this.localStorageService.getUserDataFromLocalStorage();
    if (userData) {
      const userDataLoaded =
        this.utilityService.convertUserDataFormat(userData);
      if (userDataLoaded.token) {
        const expirationDuration =
          this.utilityService.calculateExpirationDuration(
            userData._tokenExpirationDate
          );

        this.setUserData(userDataLoaded);
        this.activateUserAutoLogout(expirationDuration);
      }
    }
  }

  public handleUserLogout(): void {
    this.setUserData(null);
    this.localStorageService.resetUserDataFromLocalStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(["/welcome"]);
  }

  public activateUserAutoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.handleUserLogout();
    }, expirationDuration);
  }

  public handleDeleteUserAccount(idToken: string): Observable<string> {
    return this.http
      .post<string>(
        `${environment.authEndpointDeleteUserAccount}?key=${environment.firebaseApiKey}`,
        {
          idToken: idToken,
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
    this.setUserData(userData);

    if (login) {
      this.activateUserAutoLogout(+expiresIn * 1000);
      this.databaseService
        .getUserProfileDataFromDatabase(userData.uid)
        .subscribe({
          next: (response: UserDataFromDatabase) => {
            this.logService.logToConsole(
              new Log(
                "User profile data loaded from database successfully!",
                "INFO"
              )
            );
            this.logService.logToConsole(new Log(response));

            userData.uid = response.uid;
            userData.username = response.username;
            userData.birthDate = new Date(response.birthDate);
            userData.tasks = response.tasks;
            this.localStorageService.storeUserDataOnLocalStorage(userData);
            this.setUserData(userData);
          },
          error: (error) => {
            this.logService.logToConsole(
              new Log("getUserProfileDataFromDatabase" + error.message, "ERROR")
            );

            this.localStorageService.storeUserDataOnLocalStorage(userData);
          },
        });
    }
  }
}
