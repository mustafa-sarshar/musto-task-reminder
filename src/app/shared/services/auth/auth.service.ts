import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, tap } from "rxjs";

import {
  AuthResponsePayload,
  AuthUserCredentials,
  User,
  UserDataFromLocalStorage,
  UserRegistrationCredentials,
} from "../../models";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { UtilityService } from "../utility/utility.service";
import { DataFlowService } from "../data-flow/data-flow.service";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenExpirationTimer = null;

  constructor(
    private localStorageService: LocalStorageService,
    private dataFlowService: DataFlowService,
    private utilityService: UtilityService,
    private http: HttpClient,
    private router: Router
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

        this.dataFlowService.setUserData(userDataLoaded);
        this.activateUserAutoLogout(expirationDuration);
      }
    }
  }

  public handleUserLogout(): void {
    this.dataFlowService.setUserData(null);
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
  ) {
    const expirationDate = this.utilityService.calculateExpirationDate(
      +expiresIn
    );
    const userData = new User(localId, email, idToken, expirationDate);
    this.dataFlowService.setUserData(userData);

    if (login) {
      this.activateUserAutoLogout(+expiresIn * 1000);
      this.dataFlowService.initUserProfileData(userData);
    }
  }
}
