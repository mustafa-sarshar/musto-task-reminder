import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

import { environment } from "src/environments/environment";
import { UtilityService } from "../utility/utility.service";
import { User } from "../../models";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  public setUserProfileInDatabase(userData: User): Observable<Object> {
    return this.http
      .put<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${userData.uid}.json`,
        {
          uid: userData.uid,
          email: userData.email,
          username: userData.username,
          birthDate: userData.birthDate,
          tasks: userData.tasks,
        }
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public getUserProfileDataFromDatabase(uid: string): Observable<Object> {
    return this.http
      .get<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}.json`
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public updateUserProfileDataInDatabase(
    uid: string,
    dataToPatch: any
  ): Observable<Object> {
    return this.http
      .patch<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}.json`,
        dataToPatch
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public deleteUserProfileFromDatabase(uid: string): Observable<Object> {
    return this.http
      .delete<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}.json`
      )
      .pipe(catchError(this.utilityService.handleError));
  }
}
