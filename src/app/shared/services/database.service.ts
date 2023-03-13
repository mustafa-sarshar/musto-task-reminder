import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, tap } from "rxjs";

import { UtilityService } from "./utility.service";

import { User, UserProfile } from "../models/user.model";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  public initUserProfileInDatabase(userData: UserProfile): Observable<Object> {
    return this.http
      .put<UserProfile>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${userData.id}.json`,
        userData
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public getUserProfileDataFromDatabase(
    userData: User | null
  ): Observable<Object> {
    if (userData) {
      return this.http
        .get<UserProfile>(
          `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${userData.id}.json`
        )
        .pipe(catchError(this.utilityService.handleError));
    } else {
      return new Observable<null>();
    }
  }
}
